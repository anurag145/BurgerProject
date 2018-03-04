import axios from 'axios';
import Key from './secrets/key';


const instance =axios.create({
 
    baseURL: Key.baseURL
});

export default instance;