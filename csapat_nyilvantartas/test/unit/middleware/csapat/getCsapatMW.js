const expect = require('chai').expect;
const getCsapatMW = require('../../../../middleware/csapat/getCsapatMW');

describe('getCsapatMW middleware', function (){
    it('egy megadott id-jú csapattal kell visszatérnie', function(done){
        const reqMock = {
            params: {
                csapatid: '99'
            }
        }

        const resMock = {
            locals: {}
        };

        const modelMock = {
            findOne: (p1) => {
                expect(p1).to.be.eql({_id: '99'});
                return Promise.resolve('csapatMock');
            }
        }

        function nextMock(){
            const promise = new Promise(function (){
                expect(resMock.locals).to.be.eql({ csapat: 'csapatMock' });
                done();
            }).catch(done);

        }

        const mw = getCsapatMW({CsapatModel: modelMock});

        mw(reqMock, resMock, nextMock);

    });

    it('adatbázishiba kezelése', function(done){
        const reqMock = {
            params: {
                csapatid: '99'
            }
        }

        const resMock = {
            locals: {}
        };

        const modelMock = {
            findOne: (p1) => {
                //expect(p1).to.be.eql({_id: '98'});
                return Promise.reject('adatbázsihiba');
            }
        }

        function nextMock(err){
            const promise = new Promise(function(){
                expect(err).to.be.eql('adatbázsihiba')
                //expect(resMock.locals).to.be.eql(undefined);
                done();
            }).catch(done);

        }

        const mw = getCsapatMW({CsapatModel: modelMock});

        mw(reqMock, resMock, nextMock);

    });

    it('next hívása ha nincs csapat az adatbázisban', function(done){
        const reqMock = {
            params: {
                csapatid: '99'
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

        const mw = getCsapatMW({CsapatModel: modelMock});

        mw(reqMock, resMock, nextMock);

    });
});