/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    id : { type: 'integer', primaryKey: true, autoIncrement: true },

    name : { type: 'string' },

    lastname : { type: 'string' },

    username : { type: 'string' },

    email : { type: 'string' },

    status : { type: 'string' },

    rol : { type: 'string' },

    password : { type: 'string' },

    valid : { type: 'string' }
  }
};

