function hasToken (){

    if( window.localStorage.getItem('api-token') ){

        return true;

    } else {

        return false;

    }

}

export default hasToken;