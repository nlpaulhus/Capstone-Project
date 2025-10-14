import * as chai from "chai";
import { default as chaiHttp, request } from "chai-http";
import { faker } from "@faker-js/faker";
import app from "./app.js";
import db from "./db.js";

chai.use(chaiHttp);

const expect = chai.expect;
const should = chai.should();

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdkZDgwMGY5LTZkYjktNDYxMS05ZTMyLTFmYTkyYWM2MWNkZSIsImV4cCI6MTc2MDQ5MTc1OX0.xvkotAClZNQLfmhCFFWKvkLFvyaQ8NV4wXymHoS5mbw";

describe("API Route Tests", function () {
  it("Tests welcome route", (done) => {
    request
      .execute(app)
      .get("/api/welcome")
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  beforeEach(async function () {
    await db.query(`DELETE FROM users WHERE imdbname = 'nm0722274';`);
  });

  it("Allows users to signup with their personal data. Passwords should be hashed before storing in the database.", (done) => {
    let requestBody = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      IMDBName: "nm0722274",
      street: "5 Fenwick Circle",
      city: "Auburn",
      state: "MA",
      zip: "01501",
      profilePhoto: faker.image.avatar(),
    };
    request
      .execute(app)
      .post("/signup")
      .send(requestBody)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res).to.have.cookie("jwt");
        done();
      });
  });

  it("Allows users to login with their email and password", (done) => {
    let requestBody = {
      email: "kris@yay.com",
      password: "Kris123!",
    };

    request
      .execute(app)
      .post("/login")
      .send(requestBody)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.have.cookie("jwt");
        done();
      });
  });

  it("Allows users to edit their basic non-unique information", (done) => {
    let requestBody = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      street: "611 Nolden Street",
      city: "Los Angeles",
      state: "CA",
      zip: "90042",
      profilePhoto: faker.image.avatar(),
    };

    request
      .execute(app)
      .post("/user/edit")
      .set("Cookie", `jwt=${token}`)
      .send(requestBody)
      .end((err, res) => {
        expect(res).to.have.status(201);
        done();
      });
  });

  it("Retrieves current user data that's editable", (done) => {
    request
      .execute(app)
      .get("/user/edit")
      .set("Cookie", `jwt=${token}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("firstname");
        done();
      });
  });

  it("Should log out user", (done) => {
    request
      .execute(app)
      .get("/logout")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.equal("Logged out");
        done();
      });
  });

  it("Should retrieve profile data for a user", (done) => {
    request
      .execute(app)
      .get("/profile/ed9ba7f9-e859-466a-add8-00c9b211d6a9")
      .set("Cookie", `jwt=${token}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("profile");
        expect(res.body).to.have.property("listings");
        expect(res.body).to.have.property("listerNetwork");
        done();
      });
  });

  it("Should allow users to add credits to their network", (done) => {
    let requestBody = {
      newCredits: [
        {
          id: "tt2262532",
          title: "The Fosters",
          image:
            "https://m.media-amazon.com/images/M/MV5BMWMzZmRlMDUtOWQ3YS00ODA4LWJlMzUtMjY0MWFhZDBkOTlkXkEyXkFqcGc@._V1_.jpg",
          startDate: 2013,
          endDate: 2018,
        },
        {
          id: "tt7820906",
          title: "Good Trouble",
          image:
            "https://m.media-amazon.com/images/M/MV5BY2YzNTgzOTktZWU4Ny00YTc3LWE4ZWYtZGI4NTBhODk3ZDhlXkEyXkFqcGc@._V1_.jpg",
          startDate: 2019,
          endDate: 2024,
        },
      ],
    };

    request
      .execute(app)
      .post("/network")
      .set("Cookie", `jwt=${token}`)
      .send(requestBody)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it("Gets the logged in user's current network", (done) => {
    request
      .execute(app)
      .get("/network/user")
      .set("Cookie", `jwt=${token}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("networkArray");
        done();
      });
  });

  it("Gets the full list of services offered", (done) => {
    request
      .execute(app)
      .get("/services")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("serviceNames");
        done();
      });
  });

  it("Gets the logged in user's offered services", (done) => {
    request
      .execute(app)
      .get("/userServices")
      .set("Cookie", `jwt=${token}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("yourServices");
        done();
      });
  });

  it("Allows users to add services to their profile", (done) => {
    let requestBody = {
      servicesToAdd: [
        {
          id: "6897e418-1a18-4068-9691-9acd913f290e",
          userid: "7dd800f9-6db9-4611-9e32-1fa92ac61cde",
          servicename: "Personal Assistant",
          description: "I'll do stuff",
          price: 20,
          paymenttype: "hourly",
        },
        {
          id: "ddb4d9a8-7971-41dd-8ef3-3c08ea80572c",
          userid: "7dd800f9-6db9-4611-9e32-1fa92ac61cde",
          servicename: "Childcare",
          description: "I love childcare!",
          price: 30,
          paymenttype: "hourly",
        },
      ],
    };

    request
      .execute(app)
      .post("/userServices")
      .set("Cookie", `jwt=${token}`)
      .send(requestBody)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it("Allows users to delete a service they've been offering", (done) => {
    request
      .execute(app)
      .get("/userServices/delete/ddb4d9a8-7971-41dd-8ef3-3c08ea80572c")
      .set("Cookie", `jwt=${token}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.equal("deleted");
        done();
      });
  });

  it("Allows users to search for listings", (done) => {
    request
      .execute(app)
      .get("/search/Dog%20Walking")
      .set("Cookie", `jwt=${token}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("listings");
        expect(res.body).to.have.property("allServices");
        expect(res.body).to.have.property("mapCoordinates");
        expect(res.body).to.have.property("userzip");
        done();
      });
  });
});
