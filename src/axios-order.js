import axios from 'axios';

const instance=axios.create({
    baseURL:'https://my-react-burger-ce92d.firebaseio.com/'
});

export default instance;