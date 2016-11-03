-- Based on https://github.com/calebmer/postgraphql/blob/master/examples/forum/TUTORIAL.md



begin;
drop schema if exists plantapp, plantapp_private cascade;
drop role if exists plantapp_pgql, plantapp_anonymous, plantapp_person, plantapp_postgraphql_demo;
commit;


CREATE SCHEMA plantapp;

CREATE TABLE plantapp.plant (
    id serial PRIMARY KEY,
    symbol text NOT NULL CHECK (char_length(symbol) < 8),
    synonym text CHECK (char_length(synonym) < 8),
    sci_name text CHECK (char_length(sci_name) < 250),
    common_name text CHECK (char_length(common_name) < 50),
    family text CHECK (char_length(family) < 25),
    created_at TIMESTAMP DEFAULT now()
);
COMMENT ON TABLE plantapp.plant IS 'USDA Plants List';


CREATE FUNCTION plantapp.search_plants(SEARCH text) RETURNS SETOF plantapp.plant AS $$
  SELECT plant.*
  FROM plantapp.plant AS plant
  WHERE plant.common_name ILIKE ('%' || SEARCH || '%')
$$ LANGUAGE SQL STABLE;

COMMENT ON FUNCTION plantapp.search_plants(text) IS 'Returns plants with common_name LIKE X.';


create table plantapp.person (
  id               serial primary key,
  first_name       text not null check (char_length(first_name) < 80),
  last_name        text check (char_length(last_name) < 80),
  about            text,
  created_at       timestamp default now()
);




-- _PRIVATE SCHEMA

CREATE SCHEMA plantapp_private;

CREATE TABLE plantapp_private.person_account (
  person_id        integer PRIMARY KEY REFERENCES plantapp.person(id) ON DELETE CASCADE,
  email            text NOT NULL UNIQUE CHECK (email ~* '^.+@.+\..+$'),
  password_hash    text NOT NULL
);

COMMENT ON TABLE plantapp_private.person_account IS 'Private information about a person’s account.';
COMMENT ON COLUMN plantapp_private.person_account.person_id IS 'The id of the person associated with this account.';
COMMENT ON COLUMN plantapp_private.person_account.email IS 'The email address of the person.';
COMMENT ON COLUMN plantapp_private.person_account.password_hash IS 'An opaque hash of the person’s password.';


-- CREATE A USER ACCOUNT

CREATE extension IF NOT EXISTS "pgcrypto";

CREATE FUNCTION plantapp.register_person(
  first_name text,
  last_name text,
  email text,
  password text
) RETURNS plantapp.person AS $$
DECLARE
  person plantapp.person;
BEGIN
  INSERT INTO plantapp.person (first_name, last_name) VALUES
    (first_name, last_name)
    returning * INTO person;

  INSERT INTO plantapp_private.person_account (person_id, email, password_hash) VALUES
    (person.id, email, crypt(password, gen_salt('bf')));

  RETURN person;
END;
$$ LANGUAGE plpgsql STRICT SECURITY DEFINER;

COMMENT ON FUNCTION plantapp.register_person(text, text, text, text) IS 'Registers a person.';


CREATE ROLE plantapp_pgql login password '12345';
create role plantapp_anonymous;
grant plantapp_anonymous to plantapp_pgql;
create role plantapp_person;
grant plantapp_person to plantapp_pgql;    


create type plantapp.jwt_token as (
  role text,
  person_id integer
);


create function plantapp.authenticate(
  email text,
  password text
) returns plantapp.jwt_token as $$
declare
  account plantapp_private.person_account;
begin
  select a.* into account
  from plantapp_private.person_account as a
  where a.email = $1;

  if account.password_hash = crypt(password, account.password_hash) then
    return ('plantapp_person', account.person_id)::plantapp.jwt_token;
  else
    return null;
  end if;
end;
$$ language plpgsql strict security definer;

comment on function plantapp.authenticate(text, text) is 'Creates a JWT token that will securely identify a person and give them certain permissions.';


create function plantapp.current_person() returns plantapp.person as $$
  select *
  from plantapp.person
  where id = current_setting('jwt.claims.person_id')::integer
$$ language sql stable;

comment on function plantapp.current_person() is 'Gets the person who was identified by our JWT.';

--  GRANTS

grant usage on schema plantapp to plantapp_anonymous, plantapp_person;

grant select on table plantapp.person to plantapp_anonymous, plantapp_person;
grant update, delete on table plantapp.person to plantapp_person;

grant select on table plantapp.plant to plantapp_anonymous, plantapp_person;
grant insert, update, delete on table plantapp.plant to plantapp_person;
grant usage on sequence plantapp.plant_id_seq to plantapp_person;

grant execute on function plantapp.search_plants(text) to plantapp_anonymous, plantapp_person;
grant execute on function plantapp.authenticate(text, text) to plantapp_anonymous, plantapp_person;
grant execute on function plantapp.current_person() to plantapp_anonymous, plantapp_person;
grant execute on function plantapp.register_person(text, text, text, text) to plantapp_anonymous;


alter table plantapp.person enable row level security;
alter table plantapp.post enable row level security;

create policy select_person on plantapp.person for select
  using (true);

create policy select_plant on plantapp.plant for select
  using (true);










