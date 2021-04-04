<template>
    
    <div class="all-api">

        <header class="header-api">

            <div class="header-content">

                <div class="logo-and-menu">

                    <h4 class="logo">Api Documentation</h4>

                    <div class="menu">

                        <router-link to="/" class="menu-item"> Apis </router-link>

                        <a href="#" class="menu-item" @click=" createModal = true ">Create</a>

                    </div>

                </div>

                <div class="right-section">

                    <a href="#" class="exit-button" @click="exitMethod()"> Exit </a>

                </div>

            </div>

        </header>

        <div class="content-api">

            <div v-if="apiData.length > 0">

                <h1 class="title">Show All Apis</h1>

                <div class="api-card">

                    <div class="card" v-for="(data,index) in apiData" :key="index">

                        <h2 class="card-title">{{ data.title }}</h2>

                        <div class="card-container">

                            <p class="card-text"> {{ data.description }} </p>

                            <div class="card-buttons">

                                <router-link :to='"/api/"+data._id' class="card-buttuon">Show Api</router-link>

                                <div class="right-buttons">

                                    <button class="right-btn update-btn" @click=" openUpdateModal(data._id) ">Update</button>

                                    <button class="right-btn delete-btn" @click=" openDeleteModal(data._id) " >Delete</button>
                                
                                </div>
                            
                            </div>

                        </div>

                    </div>

                </div>

            </div>

            <div class="zero-api" v-else>

                <h1> Count Of API Is Zero </h1>

                <button class="button" @click=" createModal = true ">Create New Document</button>

            </div>

        </div>


        <!-- create modal -->
        <transition name="fade">

            <div v-if=" createModal == true " class="modal" >

                <div class="modal-section">

                    <div class="modal-header">

                        <h3 class="modal-name">Create Documentation</h3>

                    </div>

                    <div class="modal-body">

                        <form class="modal-input" @submit.prevent="createNewApiButton()">

                            <div class="modal-input-container">

                                <label for="title" class="input-label">Title</label>

                                <input type="text" autocomplete="off" v-model="createSection.title" class="input" id="title" placeholder="Please enter title : " required />

                            </div>


                            <div class="modal-input-container">

                                <label for="version" class="input-label">Version</label>

                                <input type="text" autocomplete="off" v-model="createSection.version" class="input" id="version" placeholder="Please enter version : " />

                            </div>


                            <div class="modal-input-container">

                                <label for="description" class="input-label">Description</label>

                                <textarea class="modal-description-textarea"  v-model="createSection.description" id="description" placeholder="Please enter description : " required></textarea>

                            </div>


                            <div class="modal-input-container">

                                <label for="disable" class="input-label">Disable</label>

                                <select v-model="createSection.disable" id="disable" class="modal-select-box">

                                    <option value="false" class="select-option">False</option>

                                    <option value="true" class="select-option">True</option>

                                </select>

                            </div>


                            <button type="submit" class="modal-button">Create</button>


                        </form>

                    </div>

                    <div class="modal-footer"></div>

                </div>

                <div class="overlay" @click=" createModal = false "></div>

            </div>
        
        </transition>


        <!-- update modal -->
        <transition name="fade">

            <div v-if=" updateModal == true " class="modal" >

                <div class="modal-section">

                    <div class="modal-header">

                        <h3 class="modal-name">Update Documentation</h3>

                    </div>

                    <div class="modal-body">

                        <form class="modal-input" @submit.prevent="updateApiButton()">

                            <div class="modal-input-container">

                                <label for="title" class="input-label">Title</label>

                                <input type="text" autocomplete="off" v-model="updateSection.title" class="input" id="title" placeholder="Please enter title : " required />

                            </div>


                            <div class="modal-input-container">

                                <label for="version" class="input-label">Version</label>

                                <input type="text" autocomplete="off" v-model="updateSection.version" class="input" id="version" placeholder="Please enter version : " />

                            </div>


                            <div class="modal-input-container">

                                <label for="description" class="input-label">Description</label>

                                <textarea class="modal-description-textarea" v-model="updateSection.description" id="description" placeholder="Please enter description : " required></textarea>

                            </div>


                            <div class="modal-input-container">

                                <label for="disable" class="input-label">Disable</label>

                                <select v-model="updateSection.disable" id="disable" class="modal-select-box">

                                    <option value="false" class="select-option">False</option>

                                    <option value="true" class="select-option">True</option>

                                </select>

                            </div>


                            <button type="submit" class="modal-button update-button">Update</button>


                        </form>

                    </div>

                    <div class="modal-footer"></div>

                </div>

                <div class="overlay" @click=" updateModal = false "></div>

            </div>
        
        </transition>


        <!-- delete modal -->
         <transition name="fade">

            <div v-if=" deleteModal == true " class="modal" >

                <div class="modal-section">

                    <div class="modal-header">

                        <h3 class="modal-name">Delete Documentation</h3>

                    </div>

                    <div class="modal-body">

                        <h2 class="modal-delete-title">Do you want this API deleted?</h2>

                        <div class="delete-buttons">

                            <button type="button" @click=" deleteModal = false " class="cancel-button">Cancel</button>

                            <button type="button" class="delete-button" @click="deleteApiButton()">Delete</button>

                        </div>

                    </div>

                </div>

                <div class="overlay" @click=" deleteModal = false "></div>

            </div>
        
        </transition>

    </div>

</template>


<style lang="scss">

    .all-api{

        position:relative;

        .header-api{
            
            width:100%;
            min-height:60px;
            background:#292E49;
            position:fixed;
            top:0;
            left:0;
            color:#292E49;
            display:flex;
            justify-content: center;
            align-items: center;

            .header-content{

                display:flex;
                min-width:92%;
                max-width: 96%;
                justify-content: space-between;
                align-items: center;


                .logo-and-menu{
                    color:#fff;
                    display: flex;
                    align-items: center;


                    .logo{
                        margin-right:40px;
                    }

                    .menu{
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;

                        .menu-item{
                            margin-right:15px;
                            background:transparent;
                            color:#fff;
                            text-decoration: none;
                            font-size:16px;
                            font-weight: normal;
                            cursor: pointer;
                            transition: all 0.4s ease-out;

                            &:hover{
                                color:#ddd;
                            }
                        }

                    }
                }

                .right-section{
                    .exit-button{
                        color:#fff;
                        border:1px solid #fff;
                        padding:8px 12px;
                        text-decoration: none;
                    }
                }

            }

        }

        .content-api{
            margin-top:80px;

            .title{
                text-align: center;
                color:#292E49;
                margin-bottom:30px;
            }

            .api-card{
                display:flex;
                max-width: 94%;
                margin-right:auto;
                margin-left:auto;
                height:auto;
                flex-wrap: wrap;
                box-sizing: border-box;
                justify-content: flex-start;
                

                .card{
                    box-sizing: border-box;
                    width:30%;
                    text-align: center;
                    background: #292E49;
                    border-top-left-radius: 5px;
                    border-top-right-radius: 5px;
                    border:1px solid #292E49;
                    margin-left:1%;
                    margin-right:1%;
                    margin-bottom: 20px;

                    .card-title{
                        padding-top:10px;
                        padding-bottom: 10px;
                        color:#fff;
                    }

                    .card-container{
                        background:#fff;
                        width:100%;
                        border-top-left-radius: 20px;
                        border-top-right-radius: 20px;
                        padding:15px 15px;
                        .card-text{
                            line-height:1.75;
                            text-align: justify;
                        }

                        .card-buttons{
                            display:flex;
                            justify-content: space-between;
                            align-items: center;
                            // flex-direction: row-reverse;


                            .right-buttons{
                                button{
                                    background:transparent;
                                    color:#fff;
                                    margin-top:10px;
                                    height:40px;
                                    margin-right:5px;
                                    border-radius:5px;
                                    cursor: pointer;
                                    padding:5px 12px;
                                }

                                .update-btn{
                                    background:#f1c40f;
                                }

                                .delete-btn{
                                    background:#e74c3c;
                                }
                            }
                        }

                        .card-buttuon{
                            // border:1px solid #292E49;
                            background:#292E49;
                            color:#fff;
                            display: block;
                            margin-top:10px;
                            height:40px;
                            border-radius:5px;
                            cursor: pointer;
                            padding:5px 12px;
                            text-decoration: none;
                            font-size:14px;
                            line-height: 30px;

                            &:hover{
                                text-decoration:none;
                            }
                        }
                    }
                }
            }

            .zero-api{
                max-width: 94%;
                text-align: center;
                margin-right:auto;
                margin-left:auto;

                h2{
                    color:#292E49;
                }

                button{
                    border:1px solid #292E49;
                    background:transparent;
                    color:#292E49;
                    font-size:17px;
                    margin-top:15px;
                    padding-left:10px;
                    padding-right:10px;
                    height:40px;
                    border-radius:5px;
                    cursor: pointer;
                }

                
            }

        }

    }


    .modal{
            min-width: 100vw;
            min-height:100vh;
            position:fixed;
            top:0;
            left:0;
            z-index: 1000;

            .modal-section{
                position:absolute;
                top:50%;
                left:50%;
                transform: translate(-50%,-50%);
                z-index:1001;
                max-width:450px;
                width:500px;
                min-width: 315px;
                background:#fff;
                border-radius: 5px;
                box-shadow: 0 0 3px 1px #bbb;


                .modal-header{
                    padding:15px 15px;
                    color:#292E49;
                    border-bottom: 1px dashed #292E49;
                }

                .modal-body{
                    padding:15px 15px 15px;
                    overflow-y: scroll;
                    max-height:550px;

                    .parameter-label{
                        text-align: center;
                        margin-top:18px!important;
                        margin-bottom:0px!important;
                        font-size:16px!important;
                        padding-top:12px;
                        border-top:1px solid #34383E;
                    }

                    .modal-input{

                        width:100%;

                        .modal-input-container{
                            margin-bottom:15px; 

                            .parameter-section{

                                .parameter-row{

                                    display:flex;
                                    align-items: center;
                                    justify-content: center;

                                    .parameter-section-row-item{

                                        margin:5px auto 5px;
                                        border-radius: 5px;
                                        padding:6px 8px;
                                        max-width:120px;
                                        margin:15px 0 15px;
                                    }

                                    .field-num{
                                        border:1px solid #34383E;
                                        color:#34383E;
                                        margin-right:15px;
                                    }

                                    .add{
                                        border:1px solid rgb(22, 160, 133);
                                        color:rgb(22, 160, 133);
                                        cursor: pointer;
                                        margin-right:15px;
                                    }

                                    .delete{
                                        border:1px solid #e74c3c;
                                        color:#e74c3c;
                                        cursor: pointer;
                                    }


                                }

                                .parameter-section-item{

                                    .parameter-input{

                                        margin-bottom:18px;

                                    }

                                }

                            }


                            .input-label{
                                display:block;
                                margin-bottom:6px;
                                font-size:14px;
                            }

                            .input{
                                border:1px solid #292E49;
                                padding:12px 15px;
                                border-radius: 5px;
                                display:block;
                                width:100%;
                            }

                            .modal-description-textarea{
                                border:1px solid #292E49;
                                padding:12px 15px;
                                display: block;
                                border-radius: 5px;
                                min-height:43px;
                                min-width:100%;
                                text-align: justify;
                                line-height: 1.5;
                                font-family: 'Roboto', sans-serif;
                                height:auto;
                                max-width: 100%;
                            }

                            .modal-select-box{
                                width:100%;
                                padding:12px 15px;
                                display:block;
                                border-radius:5px;
                                border:1px solid #292E49;

                                option{
                                    color: #292E49;
                                }
                            }

                        }



                        .update-button{
                            background:#f1c40f!important;
                        }

                        .modal-error{
                            color:red;
                            font-size:12px;
                            margin:8px 8px 0;
                        }

                    }

                    .modal-button{
                        width:100%;
                        padding:12px 0;
                        background: #292E49;
                        color:#fff;
                        border-radius: 5px;
                        cursor:pointer;
                    }

                    .modal-delete-title{
                        text-align: center;
                        margin-bottom:15px;
                    }

                    .delete-buttons{
                        margin-right:auto;
                        margin-left:auto;
                        text-align: center;
                    }

                    .delete-button{
                        padding:12px 15px;
                        background: #e74c3c;
                        border:1px solid #e74c3c;
                        margin-left:15px;
                        color:#fff;
                        border-radius: 5px;
                        cursor:pointer;
                    }

                    .cancel-button{
                        padding:12px 15px;
                        border:1px solid #e74c3c;
                        color: #e74c3c;
                        background:#fff;
                        border-radius: 5px;
                        cursor:pointer;
                    }

                    .create-modal-button{
                        background:rgb(22, 160, 133);
                    }

                }

            }


            .overlay{
                min-height: 100vh;
                min-width: 100vw;
                background:rgba(87, 87, 87 , 0.6);
                cursor:pointer;
                position: absolute;
                top:0;
                left:0;
                z-index: 1000;
            }
        }


    @media( max-width : 992px ) {
        .card{
            width:48%!important;
        }
    }

    @media( max-width : 768px ) {
        .card{

            width:100%!important;
            margin:10px auto;
            text-align: center;
        }
    }

</style>


<script>

import HasToken from '../middleware/hasToken';
import FetchToken from '../middleware/fetchToken';

export default {

    data(){

        return {

            apiData : [] ,

            createModal : false ,

            updateModal : false ,

            deleteModal : false ,

            createSection : {

                title : "" ,

                version : "" ,

                description : "" ,

                disable : false ,

            } ,

            updateSection : {

                document_id : "" ,

                title : "" ,

                version : "" ,

                description : "" ,

                disable : false ,

            } ,

            updateApiData : false ,

            deleteId : "" ,

        }

    },

    methods:{

        exitMethod(){

            window.localStorage.removeItem('api-token');

            this.$router.push('/login');

        } , 

        openUpdateModal(id){

            var filteredData = this.apiData.find(val=>val._id == id ) ;

            this.updateModal = true ;

            this.updateSection = {

                document_id : filteredData._id ,

                title : filteredData.title ,

                version : filteredData.version ,

                description : filteredData.description ,

                disable : filteredData.disabled 

            }

            
        } , 

        createNewApiButton(){

            fetch("http://localhost:8000/documentation/create",{

                mode : "cors" ,

                method : "POST" , 

                headers : {

                    "Content-Type":"application/json" , 

                    "Authorization": FetchToken()

                } , 

                body : JSON.stringify(this.createSection)

            }).then( createDocumentationResponse => {

                createDocumentationResponse.json().then( () => {

                    this.createModal = false;
                    this.updateApiData = true;
                    this.$forceUpdate();

                    this.createSection = {

                        title : "" ,

                        version : "" ,

                        description : "" ,

                        disable : false ,

                    }


                } ).catch( error => {
                    
                    console.log(error);

                } )

            } ).catch( error => {
                    
                console.log(error);

            } )

        } ,

        updateApiButton(){
            
            fetch("http://localhost:8000/documentation/update",{

                mode : "cors" ,

                method : "PUT" , 

                headers : {

                    "Content-Type":"application/json" , 

                    "Authorization": FetchToken()

                } , 



                body : JSON.stringify(this.updateSection)

            }).then( updateDocumentationResponse => {

                updateDocumentationResponse.json().then( () => {

                    this.updateModal = false;
                    this.updateApiData = true;
                    this.$forceUpdate();

                    this.updateSection = {

                        document_id : "" ,

                        title : "" ,

                        version : "" ,

                        description : "" ,

                        disable : false ,

                    }

                } )

            } ).catch( error => {

                console.log(error);

            } )

        } ,
        
        openDeleteModal(id){
            
            this.deleteModal = true ; 

            this.deleteId = id ;

        } ,

        deleteApiButton(){

            fetch("http://localhost:8000/documentation/delete",{

                mode : "cors" ,

                method : "DELETE" , 

                headers : {

                    "Content-Type":"application/json" , 

                    "Authorization": FetchToken()

                } , 



                body : JSON.stringify({ document_id : this.deleteId })

            }).then( deleteDocumentationResult => {

                deleteDocumentationResult.json().then( () => {

                    this.deleteModal = false;
                    this.updateApiData = true;
                    this.$forceUpdate();

                } ).catch( error => {

                    console.log(error);

                } )

            } ).catch( error => {

                console.log(error);

            } )

        }

    },

    created(){
        
        if( HasToken() == false ){

            this.$router.push('/login');

        } else {

            fetch("http://localhost:8000/documentation/fetch-all",{

                mode : "cors" ,

                method : "GET" , 

                headers : {

                    "Content-Type":"application/json" , 

                    "Authorization": FetchToken()

                }

            }).then( fetchAllDocumentationResponse => {

                fetchAllDocumentationResponse.json().then( dataResponse => {

                    this.apiData = dataResponse;

                } ).catch( error => {

                    console.log(error);

                } )

            } ).catch( error => {

                console.log(error);

            } )

        }

    } ,

    updated(){

        // updateApiData
        if( this.updateApiData == true ){

            fetch("http://localhost:8000/documentation/fetch-all",{

                mode : "cors" ,

                method : "GET" , 

                headers : {

                    "Content-Type":"application/json" , 

                    "Authorization": FetchToken()

                }

            }).then( fetchAllDocumentationResponse => {

                fetchAllDocumentationResponse.json().then( dataResponse => {

                    this.apiData = dataResponse;
                    this.updateApiData = false;

                } ).catch( error => {

                    console.log(error);

                } )

            } ).catch( error => {

                console.log(error);

            } )

        }

    }

}

</script>