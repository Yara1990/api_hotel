'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var GuestSchema = new Schema({
  GuestId: {
    type: String,
    default:''
  },
  Surname: {
    type: String,
    default:''
  },
  GivenName: {
    type: String,
    default:''
  },
  DateOfBirth: {
    type: String,
    default:''
  },
  Nationality: {
    type: String,
    default:''
  },
  ArrivedFrom: {
    type: String,
    default:''
  },
  BlackListStatus: {
    type: String,
    default:''
  },
  IdentificationType: {
    type: String,
    default:''
  },
  DateOfArrivalInHotel: {
    type: String,
    default:''
  },
  VerificationStatus: {
    type: String,
    default:''
  },
  Remarks: {
    type: String,
    default:''
  },
  HotelName: {
    type: String,
    default:''
  },
  HotelAddress: {
    type: String,
    default:''
  },
  Zone: {
    type: String,
    default:''
  },
  City: {
    type: String,
    default:''
  },
  State: {
    type: String,
    default:''
  },
  HotelPhoneNo: {
    type: String,
    default:''
  },
  FormCAppNo: {
    type: String,
    default:''
  },
  VisaNumber: {
    type: String,
    default:''
  },
  ValidTill: {
    type: String,
    default:''
  },
  VisaPlaceOfIssue: {
    type: String,
    default:''
  },
  VisaDateOfIssue: {
    type: String,
    default:''
  },
  VisaType: {
    type: String,
    default:''
  },
  PassportNumber: {
    type: String,
    default:''
  },
  PassportPlaceOfIssue: {
    type: String,
    default:''
  },
  PassportDateOfIssue: {
    type: String,
    default:''
  },
  PassportExpiryDate: {
    type: String,
    default:''
  },
  AddressCountryOfResidence: {
    type: String,
    default:''
  },
  AddressCurrent: {
    type: String,
    default:''
  },
  DateOfArrivalInIndia: {
    type: String,
    default:''
  },
  EmployedInIndia: {
    type: String,
    default:''
  },
  PurposeOfVisit: {
    type: String,
    default:''
  },
  NextDestination: {
    type: String,
    default:''
  },
  IndianContactNumber: {
    type: String,
    default:''
  },
  IndianMobileNumber: {
    type: String,
    default:''
  },
  PermanentMobileNumber: {
    type: String,
    default:''
  },
  file: {
    type: String,
    default:''
  },
});

module.exports = mongoose.model('Guest', GuestSchema);


 /* status: {
    type: [{
      type: String,
      enum: ['pending', 'ongoing', 'completed']
    }],
    default: ['pending']
  }*/