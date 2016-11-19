'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  databaseUrl: process.env.DATABASE_URL || 'postgres:///hills120',
  maxRecs: 100
};