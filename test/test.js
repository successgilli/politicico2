import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import server from '../src/app';

dotenv.config();
const should = chai.should();
chai.use(chaiHttp);

const data = {
  name: 'gilbert',
  hqAddress: 'bearbea',
  logoUrl: 'bearrmpitdairs',
};
const dataa = {
  name: 'gilbert',
  type: 'bearbea',
};
const badData = {
  hqAddress: 'somewhere',
  logoUrl: 'somethingLikeThat',
};
const badDataa = {
  type: 'somewhere',
};
const badData2 = {
  hqAddress: 'somewhere',
  name: 'awaji-mitop',
};
const badDataa2 = {
  name: 'politico',
};
const badData3 = {
  logoUrl: 'somethingLikeThat',
  name: 'awaji-mitop',
};
const badData4 = {
  name: ' ',
  hqAddress: 'somewhere',
  logoUrl: 'somethingLikeThat',
};
const badDataa4 = {
  name: ' ',
  type: 'somewhere',
};
const badData41 = {
  name: 'ghah@e ',
  hqAddress: 'somewhere',
  logoUrl: 'somethingLikeThat',
};
const badDataa41 = {
  name: 'ghah@e ',
  type: 'somewhere',
};
const badData5 = {
  name: 'gilbert',
  hqAddress: '    ',
  logoUrl: 'somethingLikeThat',
};
const badDataa5 = {
  name: 'gilbert',
  type: '    ',
};
const badData51 = {
  name: 'gilbert',
  hqAddress: ' rft ',
  logoUrl: 'somethingLikeThat',
};
const badDataa51 = {
  name: 'gilbert',
  type: 'rf',
};
const badData6 = {
  name: 'gilbert',
  hqAddress: 'somewhere',
  logoUrl: ' ',
};
const partyTestData = {
  name: 'giltest',
  hqAddress: 'bearbea',
  logoUrl: 'bearrmpitdairs',
};

let id;
describe('test createParty Route', () => {
  it('should respond when error message when input is incorrect', (done) => {
    chai.request(server).post('/api/v1/parties').send(badData).end((err, res) => {
      res.statusCode.should.equal(400);
      res.body.message.should.equal('missing name field');
      done();
    });
  });
  it('should check validate hdAddress field', (done) => {
    chai.request(server).post('/api/v1/parties').send(badData3).end((err, res) => {
      res.body.message.should.equal('missing hqAddress field');
      res.statusCode.should.equal(400);
      done();
    });
  });
  it('should validate logoUrl field', (done) => {
    chai.request(server).post('/api/v1/parties').send(badData2).end((err, res) => {
      res.body.message.should.equal('missing logoUrl field');
      res.statusCode.should.equal(400);
      done();
    });
  });
  it('should ensure name field isnt empty', (done) => {
    chai.request(server).post('/api/v1/parties').send(badData4).end((err, res) => {
      res.body.message.should.equal('empty name field');
      res.statusCode.should.equal(400);
      done();
    });
  });
  it('should ensure name field contains proper name style', (done) => {
    chai.request(server).post('/api/v1/parties').send(badData41).end((err, res) => {
      res.body.message.should.equal('name field can only contain underscores, words, and digits and must not be less than 5 letters cannot also use all numbers');
      res.statusCode.should.equal(400);
      done();
    });
  });
  it('should ensure hqAddress field is not empty', (done) => {
    chai.request(server).post('/api/v1/parties').set('authorization', process.env.ADMINTRUE_AUTH).send(badData5).
      end((err, res) => {
        res.body.message.should.equal('empty hqAddress field');
        res.statusCode.should.equal(400);
        done();
      });
  });
  it('should ensure hqAddress field contains proper name style', (done) => {
    chai.request(server).post('/api/v1/parties').send(badData51).end((err, res) => {
      res.body.message.should.equal('hqAddress field can only contain underscores, words, and digits and must not be less than 5 letters');
      res.statusCode.should.equal(400);
      done();
    });
  });
  it('should ensure logoUrl field is not empty', (done) => {
    chai.request(server).post('/api/v1/parties').send(badData6).end((err, res) => {
      res.body.message.should.equal('empty logoUrl field');
      res.statusCode.should.equal(400);
      done();
    });
  });
  it('should return success message on success', (done) => {
    chai.request(server).post('/api/v1/parties').set('authorization', process.env.ADMINTRUE_AUTH).send(partyTestData)
      .end((err, res) => {
        console.log(res.body);
        res.body.data[0].should.have.property('name');
        res.body.data[0].should.have.property('id');
        id = res.body.data[0].id;
        console.log(id);
        res.statusCode.should.equal(200);
        done();
      });
  });
  it('should return success message on success2', (done) => {
    chai.request(server).post('/api/v1/parties').set('authorization', process.env.ADMINTRUE_AUTH).send(data)
      .end((err, res) => {
        res.body.message.should.equal('party name already exists');
        res.statusCode.should.equal(400);
        done();
      });
  });
});

describe('getParty route', () => {
  it('it should catch improper inputs', (done) => {
    chai.request(server).get('/api/v1/parties/uegyy').end((err, res) => {
      res.body.should.equal('route not available');
      done();
    });
  });
  it('it should tell if party isnt found', (done) => {
    chai.request(server).get('/api/v1/parties/5').set('authorization', process.env.ADMINTRUE_AUTH).end((err, res) => {
      res.body.message.should.equal('party does not exit');
      done();
    });
  });
  it('it should return the party with name, id and logourl if found', (done) => {
    chai.request(server).get(`/api/v1/parties/${id}`).set('authorization', process.env.ADMINTRUE_AUTH).end((err, res) => {
      res.should.be.json;
      res.body.data[0].should.have.property('name');
      res.body.data[0].should.have.property('id');
      res.body.data[0].should.have.property('logoUrl');
      done();
    });
  });
});

describe('get AllParties route', () => {
  it('should return all parties on my database', (done) => {
    chai.request(server).get('/api/v1/parties').set('authorization', process.env.ADMINTRUE_AUTH).end((err, res) => {
      res.statusCode.should.equal(200);
      res.body.should.have.property('data');
      done();
    });
  });
});

describe('Patch party', () => {
  it('should catch improper inputs', (done) => {
    chai.request(server).patch('/api/v1/parties/partyId/name').end((err, res) => {
      res.body.should.equal('route not available');
      done();
    });
  });
  it('change party name and return party', (done) => {
    chai.request(server).patch(`/api/v1/parties/${id}/gibitoo`).set('authorization', process.env.ADMINTRUE_AUTH).end((err, res) => {
      console.log(res.body)
      res.body.should.have.property('data');
      done();
    });
  });
  it('should tell if party dosnt exist', (done) => {
    chai.request(server).patch('/api/v1/parties/100000/gloit').set('authorization', process.env.ADMINTRUE_AUTH).end((err, res) => {
      res.body.should.have.property('message').eql('party does not exist');
      done();
    });
  });
  it('should tell if party already exist', (done) => {
    chai.request(server).patch(`/api/v1/parties/${id}/gilbert`).set('authorization', process.env.ADMINTRUE_AUTH).end((err, res) => {
      console.log(res.body)
      res.body.should.have.property('message');
      done();
    });
  });
});

describe('Delete party', () => {
  it('should selete party and return name of deleted party', (done) => {
    chai.request(server).delete(`/api/v1/parties/${id}`).set('authorization', process.env.ADMINTRUE_AUTH).end((err, res) => {
      res.body.should.have.property('data');
      res.body.data[0].should.have.property('message');
      done();
    });
  });
  it('should tell if party is not found', (done) => {
    chai.request(server).delete('/api/v1/parties/5').set('authorization', process.env.ADMINTRUE_AUTH).end((err, res) => {
      res.body.should.have.property('message');
      done();
    });
  });
});
// complete this after delete route completed
describe('test createOffice Route', () => {
  it('should respond with error message when input is incorrect', (done) => {
    chai.request(server).post('/api/v1/offices').set('authorization', process.env.ADMINTRUE_AUTH).send(badDataa).end((err, res) => {
      res.statusCode.should.equal(400);
      res.body.message.should.equal('missing name field');
      done();
    });
  });
  it('should validate type field', (done) => {
    chai.request(server).post('/api/v1/offices').set('authorization', process.env.ADMINTRUE_AUTH).send(badDataa2).end((err, res) => {
      res.body.message.should.equal('missing type field');
      res.statusCode.should.equal(400);
      done();
    });
  });
  it('should ensure name field isnt empty', (done) => {
    chai.request(server).post('/api/v1/offices').set('authorization', process.env.ADMINTRUE_AUTH).send(badDataa4).end((err, res) => {
      res.body.message.should.equal('empty name field');
      res.statusCode.should.equal(400);
      done();
    });
  });
  it('should ensure name field contains proper name style', (done) => {
    chai.request(server).post('/api/v1/offices').set('authorization', process.env.ADMINTRUE_AUTH).send(badDataa41).end((err, res) => {
      res.body.message.should.equal('name field can only contain underscores, words, and digits and must not be less than 5 letters cannot also use all numbers');
      res.statusCode.should.equal(400);
      done();
    });
  });
  it('should ensure type field is not empty', (done) => {
    chai.request(server).post('/api/v1/offices').set('authorization', process.env.ADMINTRUE_AUTH).send(badDataa5).end((err, res) => {
      res.body.message.should.equal('empty name field');
      res.statusCode.should.equal(400);
      done();
    });
  });
  it('should ensure type field contains proper name style', (done) => {
    chai.request(server).post('/api/v1/offices').set('authorization', process.env.ADMINTRUE_AUTH).send(badDataa51).end((err, res) => {
      res.body.message.should.equal('name field can only contain underscores, words, and digits and must not be less than 5 letters cannot also use all numbers');
      res.statusCode.should.equal(400);
      done();
    });
  });
  /* it('should return success message on success', (done) => {
    chai.request(server).post('/api/v1/offices').send(partyTestData).end((err, res) => {
      console.log(res.body);
      res.body.data[0].should.have.property('name');
      res.body.data[0].should.have.property('id');
      id = res.body.data[0].id;
      console.log(id);
      res.statusCode.should.equal(200);
      done();
    });
  }); */
  it('should return success message on success', (done) => {
    chai.request(server).post('/api/v1/offices').set('authorization', process.env.ADMINTRUE_AUTH).send(dataa)
      .end((err, res) => {
        res.body.message.should.equal('office name already exists');
        res.statusCode.should.equal(400);
        done();
      });
  });
});

describe('get Alloffices route', () => {
  it('should return all offices on my database', (done) => {
    chai.request(server).get('/api/v1/offices').set('authorization', process.env.ADMINTRUE_AUTH).end((err, res) => {
      res.statusCode.should.equal(200);
      res.body.should.have.property('data');
      done();
    });
  });
});
describe('getOffice route', () => {
  it('it should catch improper inputs', (done) => {
    chai.request(server).get('/api/v1/offices/uegyy').set('authorization', process.env.ADMINTRUE_AUTH).end((err, res) => {
      res.body.should.equal('route not available');
      done();
    });
  });
  it('it should tell if office isnt found', (done) => {
    chai.request(server).get('/api/v1/offices/1000000').set('authorization', process.env.ADMINTRUE_AUTH).end((err, res) => {
      res.body.message.should.equal('office does not exit');
      done();
    });
  });
  it('it should return the office with name, id and type if found', (done) => {
    chai.request(server).get(`/api/v1/offices/${1}`).set('authorization', process.env.ADMINTRUE_AUTH).end((err, res) => {
      res.should.be.json;
      res.body.data[0].should.have.property('name');
      res.body.data[0].should.have.property('id');
      res.body.data[0].should.have.property('type');
      done();
    });
  });
});

