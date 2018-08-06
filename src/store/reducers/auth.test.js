import reducer from  './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer',()=>{
 it('should return initial state',()=>{
     expect(reducer(undefined,{})).toEqual({
        token:null,
        userId:null,
        error:null,
        loading:false,
        authRedirectPath: '/'
     })
 })
});