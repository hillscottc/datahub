'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  databaseUrl: process.env.DATABASE_URL || 'postgres:///triv_db',
  maxRecs: 100
};