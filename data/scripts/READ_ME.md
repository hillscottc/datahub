


-- Note, you need to get the path right here. This should be scripted somehow.

```
\COPY plantapp.plant(symbol,synonym,sci_name,common_name,family) FROM '/Users/hills120/dev/datahub/data/plants.csv' DELIMITER ',' CSV HEADER
```




```
postgraphql \
  --connection postgres://plantapp_pgql:12345@localhost:5432 \
  --schema plantapp \
  --default-role plantapp_anonymous \
  --secret deadpool \
  --token plantapp.jwt_token
```


[http://localhost:5000/graphiql]
{
  searchPlants(search: "ivy", first: 5) {
    pageInfo {
      hasNextPage
    }
    totalCount
    edges {
      cursor
      node {
        family
        commonName
      }
    }
  }
}


