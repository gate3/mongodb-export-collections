const mongoose = require('mongoose');
const mongoose_csv = require('mongoose-to-csv');

const { Schema } = mongoose;

const schemaObject = {
    fname: String,
    mname: String,
    lname: String,
    address: String,
    password: String,
    program: {type: Number, enum:[1, 2]} // 1 = tax, 2 -teach
}

/**
 * Another method of doing this is to only add fields that should be exportable and then use Object.assign to add the rest of the fields. e.g.
 * 
 * const exportables = {
    fname: String,
    mname: String,
    lname: String,
    address: String,
    program: {type: Number, enum:[1, 2]} // 1 = tax, 2 -teach
   }

   const allFields = {
       password: String
   }

   Object.assign(allFields, exportables)

*Then use allFields 

   const UserSchema = new Schema(
    allFields,
    {
        toObject:{virtuals:true},
        toJSON:{virtuals:true},
        timestamps:true
    });
 * 
 */

const UserSchema = new Schema(
    schemaObject,
{
      toObject:{virtuals:true},
      toJSON:{virtuals:true},
      timestamps:true
});

UserSchema.virtual('program_name').get(function () {
    return this.program === 1 ? 'Tax' : 'Teach'
});

/**
 * I need to exclude password from list of exportable fields. When i need to exclude more than one field, the approach below can be used.
 * 
 * const excludeFields = ['password', 'address']
 * 
 * const headers = Object.keys(schemaObject).filter(h => excludeFields.findIndex((v)=> v == h) !== -1).join(' ')
 */

const h = Object.keys(schemaObject).filter(h=>h !== 'password').join(' ')

UserSchema.plugin(mongoose_csv, {
    headers: `${h} program_name`,// add the program_name so it can be exported too
    virtuals:{
        program: function (doc) {
            return doc.program === 1 ? 'Tax' : 'Teach'
        }
    }
})

module.exports = mongoose.model('user', UserSchema);