"use strict";
let chai = require("chai");
let server = require("../../app-server");
let chaiHttp = require("chai-http");
let expect = require("chai").expect;
let should = require("chai").should();
const authController = require("../../src/controllers/auth-controller");

chai.use(chaiHttp);
/* global describe, it :true*/
describe("AuthController", function() {

  it("The service shall exist", function() {
    chai.expect(authController).to.exist;
  });

  describe("#getAuthToken()", function() {
    it("should return a token on /auth/token POST", function(done) {
      chai.request(server)
        .post("/auth/token")
        .send({ "email": "newput@mailinator.com", "password": "123456" })
        .end( function(err, res) {
          expect(res.body).to.be.a("object");
          should.exist(res.body);
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("success");
          res.body.success.should.equal(true);
          done();
        });
    });
  });
});
