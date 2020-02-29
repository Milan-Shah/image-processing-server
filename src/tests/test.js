import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src/server';

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("GET", () => {

    it ("should send 200 for a valid filteredImage request", (done) => {
        chai.request(app)
        .get('/filteredimage?image_url=https://i.pinimg.com/originals/1b/6a/de/1b6ade076c494d9d7f82c32206d8488d.jpg')
        .end((err,res) => {
            res.should.have.status(200);
            res.body.should.be.instanceof(Buffer);
            done();
        });
    });

    it ("should send 422 status for an invalid request with invalid url format", (done) => {
        chai.request(app)
        .get('/filteredimage?image_url=www.google.com')
        .end((err,res) => {
            res.should.have.status(422);
            done();
        });
    });

    it ("should send 404 for an invalid request other than /filteredImage", (done) => {
        chai.request(app)
        .get('/ivur')
        .end((err,res) => {
            res.should.have.status(404);
            done();
        });
    });

    it ("should send 400 status if query param is not added", (done) => {
        chai.request(app)
        .get('/filteredimage')
        .end((err,res) => {
            res.should.have.status(400);
            done();
        });
    });

});