const expect = require('chai').expect;
const getJatekosMW = require('../../../../middleware/jatekos/getJatekosMW');
const getCsapatMW = require("../../../../middleware/csapat/getCsapatMW");

describe('getJatekosMW middleware', function (){
    it('egy megadott id-jú játékossal kell visszatérnie', function(done){
        const reqMock = {
            params: {
                jatekosid: '99'
            }
        }

        const resMock = {
            locals: {}
        };

        const modelMock = {
            findOne: (p1) => {
                expect(p1).to.be.eql({_id: '99'});
                return Promise.resolve('jatekosMock');
            }
        }

        function nextMock(){
            const promise = new Promise(function (){
                expect(resMock.locals).to.be.eql({ jatekos: 'jatekosMock' });
                done();
            }).catch(done);

        }

        const mw = getJatekosMW({JatekosModel: modelMock});

        mw(reqMock, resMock, nextMock);

    });

    it('adatbázishiba kezelése', function(done){
        const reqMock = {
            params: {
                jatekoscleid: '99'
            }
        }

        const resMock = {
            locals: {}
        };

        const modelMock = {
            findOne: (p1) => {
                return Promise.reject('adatbázsihiba');
            }
        }

        function nextMock(err){
            const promise = new Promise(function(){
                expect(err).to.be.eql('adatbázsihiba')
                done();
            }).catch(done);

        }

        const mw = getJatekosMW({JatekosModel: modelMock});

        mw(reqMock, resMock, nextMock);

    });

    it('next hívása ha nincs játékos az adatbázisban', function(done){
        const reqMock = {
            params: {
                jatekosid: '99'
            }
        }

        const resMock = {
            locals: {}
        };

        const modelMock = {
            findOne: (p1) => {
                expect(p1).to.be.eql({_id: '99'});
                return Promise.resolve(null);
            }
        }

        function nextMock(){
            const promise = new Promise(function (){
                expect(resMock.locals).to.be.eql({});
                done();
            }).catch(done);

        }

        const mw = getJatekosMW({JatekosModel: modelMock});

        mw(reqMock, resMock, nextMock);

    });
});