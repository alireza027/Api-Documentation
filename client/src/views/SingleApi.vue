<template>
    
    <div style="position:relative">

        <div class="single-api">

            <div class="container">

                <h3 class="welcome-text">Welcome</h3>

                <h2 class="title" style="text-transform:uppercase;">{{ document.title }}</h2>

                <div class="vertical-line" ></div>

                <p class="api-description"> {{document.description }} </p>


                <!-- path section -->
                <div class="title-item">

                    <div class="row">

                        <h2 class="title"> Path API </h2>

                        <button class="title-button-link" @click=" pathModal = true ">Create</button>

                    </div>

                    <div class="vertical-line"></div>



                    <!-- path routes -->
                    <div v-if=" document.constructor().toLocaleString() == '[object Object]' && document.paths.length > 0 ">

                        <div v-for="( path , index ) in document.paths" :key="index" class="content-section" >

                            <h2 class="content-title" style="text-transform:capitalize;">

                                {{ path.title }}

                                <span class="create-new-path" style="margin-right:10px;margin-left:5px;color:#2ecc71" @click=" addDocModalOpen(path._id) ">Add Doc</span>

                                <span class="create-new-path" style="margin-right:10px;color:#F49C2E;" @click=" updatePathModalOpen(path._id) ">Update</span>

                                <span class="create-new-path" style="color:#F13333;" @click=" deletePathModalOpen(path._id) ">Delete</span>

                            </h2>

                            

                            <div v-if=" path.docs.length > 0 " >

                                <div class="content" v-for="(doc,index) in path.docs" :key="index">

                                    <div class="content-item" @click="openDocSidebar(path._id , doc._id)" :class="borderColorMethodType(doc.method)" @contextmenu.prevent="pathContextMenu(path._id , doc._id)">

                                        <div class="content-item-request-type" :class="backgroundColorMethodType(doc.method)" style="text-transform:uppercase;">{{ doc.method.toUpperCase() }}</div>

                                        <div class="content-item-title-and-subtitle">

                                            <p class="content-item-title" style="text-transform:capitalize;">{{ doc.title }}</p>

                                            <p class="content-item-subtitle" v-if=" doc.sub_title " style="text-transform:capitalize;">{{ doc.sub_title }}</p>

                                        </div>

                                    </div>

                                    <p class="content-item-description" v-if=" doc.description != undefined && doc.description.length > 0 ">{{ doc.description }}</p>

                                </div>

                            </div>

                            <div v-else class="empty-path-schema">

                                <h3>We Not Have a Doc</h3>

                            </div>
                            
                        
                        </div>

                    </div>

                    <div v-else class="empty-path-schema">

                        <h3>We Not Have a Path</h3>

                    </div>


                </div>



                <!-- schema section -->

                <div class="title-item schema-section margin-top-little">

                    <div class="row">

                        <h2 class="title"> Schema </h2>

                        <button class="title-button-link" @click="schemaModal = true ">Create</button>

                    </div>

                    <div class="vertical-line"></div>

                    <div v-if=" document.constructor().toLocaleString() == '[object Object]' && document.schemes.length > 0 ">

                        <div v-if=" document.schemes.length > 0 ">

                            <div v-for="(scheme,index) in document.schemes" :key="index" class="schema-content">

                                <div class="schema-section-item" @click=" openSchemaSidebar(scheme._id) " :class="schemaRandomColor()" @contextmenu.prevent="schemaContextMenu(document._id , scheme._id )">

                                    <p class="schema-title" style="text-transform:capitalize;">{{ scheme.title }}</p>
                                
                                </div>

                                <p class="schema-description" v-if=" scheme.description != undefined && scheme.description.length > 0 "> {{ scheme.description }} </p>
                        
                            </div>

                        </div>

                        <div v-else class="empty-path-schema">

                            <h3>We Not Have a Schema</h3>

                        </div>

                    </div> 


                    <div v-else class="empty-path-schema">

                        <h3>We Not Have a Schema</h3>

                    </div>

                </div>

            </div>


            <!-- hoverable path paper in the context menu -->
            <div class="hoverable-path-paper">

                <button class="update-btn" @click=" updateDocModal() ">Update Path</button>

                <button class="delete-btn" @click=" deleteDocModalOpen = true ">Delete Path</button>

            </div>


            <!-- hoverable schema paper in the context menu -->
            <div class="hoverable-schema-paper">

                <button class="update-btn" @click=" updateSchemaModal() ">Update Schema</button>

                <button class="delete-btn" @click=" deleteSchemaModalOpen = true ">Delete Schema</button>

            </div>


            <!-- path create modal -->
            <transition name="fade">

                <div v-if=" pathModal == true " class="modal" >

                    <div class="modal-section">

                        <div class="modal-header">

                            <h3 class="modal-name">Create Path</h3>

                        </div>

                        <div class="modal-body">

                            <form class="modal-input" @submit.prevent=" createPath() ">

                                <div class="modal-input-container">

                                    <label for="title" class="input-label">Title</label>

                                    <input type="text" autocomplete="off" v-model="pathCreateSection.title" class="input" id="title" placeholder="Please enter title : " required />

                                </div>


                                <div class="modal-input-container">

                                    <label for="description" class="input-label">Description</label>

                                    <input type="text" autocomplete="off" v-model="pathCreateSection.description" class="input" id="description" placeholder="Please enter description : " required />

                                </div>


                                <div class="modal-input-container">

                                    <label for="route" class="input-label">Route</label>

                                    <input type="text" autocomplete="off" v-model="pathCreateSection.route" class="input" id="title" placeholder="Please enter route : " required />

                                </div>


                                <button type="submit" class="modal-button create-modal-button">Create</button>


                            </form>

                        </div>

                        <div class="modal-footer"></div>

                    </div>

                    <div class="overlay" @click=" createOrUpdatePathModalClose() "></div>

                </div>
            
            </transition>


            <!-- path update modal -->
            <transition name="fade">

                <div v-if=" updatePathModal == true " class="modal" >

                    <div class="modal-section">

                        <div class="modal-header">

                            <h3 class="modal-name">Update Path</h3>

                        </div>

                        <div class="modal-body">

                            <form class="modal-input" @submit.prevent=" updatePath() ">

                                <div class="modal-input-container">

                                    <label for="title" class="input-label">Title</label>

                                    <input type="text" autocomplete="off" v-model="pathCreateSection.title" class="input" id="title" placeholder="Please enter title : " required />

                                </div>


                                <div class="modal-input-container">

                                    <label for="description" class="input-label">Description</label>

                                    <input type="text" autocomplete="off" v-model="pathCreateSection.description" class="input" id="description" placeholder="Please enter description : " required />

                                </div>


                                <div class="modal-input-container">

                                    <label for="route" class="input-label">Route</label>

                                    <input type="text" autocomplete="off" v-model="pathCreateSection.route" class="input" id="title" placeholder="Please enter route : " required />

                                </div>


                                <button type="submit" class="modal-button create-modal-button" style="background:#">Update</button>


                            </form>

                        </div>

                        <div class="modal-footer"></div>

                    </div>

                    <div class="overlay" @click=" createOrUpdatePathModalClose() "></div>

                </div>
            
            </transition>


            <!-- path delete modal -->
            <transition name="fade">

                <div v-if=" deletePathModal == true " class="modal" >

                    <div class="modal-section">

                        <div class="modal-header">

                            <h3 class="modal-name">Delete Path</h3>

                        </div>

                        <div class="modal-body">

                            <h2 class="modal-delete-title">Do you want Delete This Path ?</h2>

                            <div class="delete-buttons">

                                <button type="button" @click=" deletePathModal = false " class="cancel-button">Cancel</button>

                                <button type="button" class="delete-button" @click=" deletePath() ">Delete</button>

                            </div>

                        </div>

                    </div>

                    <div class="overlay" @click=" deletePathModal = false "></div>

                </div>
            
            </transition>


            <!-- doc create modal -->
            <transition name="fade">

                <div v-if=" docModal == true " class="modal" >

                    <div class="modal-section">

                        <div class="modal-header">

                            <h3 class="modal-name">Create Doc ( Path SubSet ) </h3>

                        </div>

                        <div class="modal-body">

                            <form class="modal-input" @submit.prevent="createDoc() ">

                                <div class="modal-input-container">

                                    <label for="title" class="input-label">Title</label>

                                    <input type="text" autocomplete="off" v-model="docCreateSection.title" class="input" id="title" placeholder="Please enter title : " required />

                                </div>


                                <div class="modal-input-container">

                                    <label for="sub-title" class="input-label">Sub Title</label>

                                    <input type="text" autocomplete="off" v-model="docCreateSection.sub_title" class="input" id="sub-title" placeholder="Please enter sub title : " />

                                </div>


                                <div class="modal-input-container">

                                    <label for="description" class="input-label">Description</label>

                                    <textarea class="modal-description-textarea"  v-model="docCreateSection.description" id="description" placeholder="Please enter description : "></textarea>

                                </div>

                                
                                <div class="modal-input-container">

                                    <label for="method" class="input-label">Method</label>

                                    <input type="text" autocomplete="off" v-model="docCreateSection.method" class="input" id="method" placeholder="Please enter method : " required />

                                </div>


                                <div class="modal-input-container">

                                    <label for="full-route" class="input-label">Full Route</label>

                                    <input type="text" autocomplete="off" v-model="docCreateSection.full_route" class="input" id="full-route" placeholder="Please enter full route : " required />

                                </div>


                                <div class="modal-input-container">

                                    <label for="parameters" class="input-label parameter-label">Parameters</label>

                                    <div class="parameter-section" id="parameters">

                                        <div v-if=" docCreateSection.parameters.length > 0 ">

                                            <div v-for="(parameter,index) in docCreateSection.parameters" :key="index">

                                                <div class="parameter-row">

                                                    <h5 class="parameter-section-row-item add" @click=" addParameterContentInDocModal() ">Add New</h5>

                                                    <h5 class="parameter-section-row-item field-num">Field Number {{ index + 1 }}</h5>

                                                    <h5 class="parameter-section-row-item delete" @click=" deleteParameterContentInDocModal(parameter.id) ">Delete</h5>

                                                </div>

                                                <div class="parameter-section-item">

                                                    <div class="parameter-label-and-input">

                                                        <label class="input-label">Attribute Name</label>

                                                        <input type="text" autocomplete="off" v-model="parameter.name" class="input parameter-input" placeholder="Enter attribute name" required/>

                                                    </div>

                                                    <div class="parameter-label-and-input">

                                                        <label class="input-label">Attribute Data Type</label>

                                                        <input type="text" autocomplete="off" v-model="parameter.data_type" class="input parameter-input" placeholder="Enter attribute data type" required/>

                                                    </div>

                                                    <div class="parameter-label-and-input">

                                                        <label class="input-label">Attribute Description</label>

                                                        <textarea class="modal-description-textarea parameter-input" v-model="parameter.description"  placeholder="Enter header description : "></textarea>

                                                    </div>

                                                    <div class="parameter-label-and-input">

                                                        <label class="input-label">Attribute Example</label>

                                                        <input type="text" autocomplete="off" v-model="parameter.example" class="input parameter-input" placeholder="Enter attribute example" />

                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                        <div v-else>

                                            <h4 class="empty-doc" style="text-align:center;margin-top:10px;font-weight:normal;color:#b1b3b6;">We Don't have a Parameter</h4>

                                            <button @click=" addParameterContentInDocModal() " style=" text-align: center; margin: 10px auto 0; display: block; color: #16A085; background: transparent; padding: 8px 12px; border: 1px solid #16A085; border-radius: 5px; cursor: pointer;">Add</button>
                                        
                                        </div>
                                    
                                    </div>
                                    

                                </div>


                                <div class="modal-input-container">

                                    <label for="headers" class="input-label parameter-label">Headers</label>

                                    <div class="parameter-section" id="headers">

                                        <div v-if=" docCreateSection.headers.length > 0 ">

                                            <div v-for="(header,index) in docCreateSection.headers" :key="index">

                                                <div class="parameter-row">

                                                    <h5 class="parameter-section-row-item add" @click=" addHeaderContentInDocModal() ">Add</h5>

                                                    <h5 class="parameter-section-row-item field-num">Field Number {{ index + 1 }}</h5>

                                                    <h5 class="parameter-section-row-item delete" @click=" deleteHeaderContentInDocModal(header.id) ">Delete</h5>

                                                </div>

                                                <div class="parameter-section-item">

                                                    <div class="parameter-label-and-input">

                                                        <label class="input-label">Header Name</label>

                                                        <input type="text" autocomplete="off" v-model=" header.name " class="input parameter-input" placeholder="Enter header name" />

                                                    </div>

                                                    <div class="parameter-label-and-input">

                                                        <label class="input-label">Header Value</label>

                                                        <input type="text" autocomplete="off" v-model=" header.value " class="input parameter-input" placeholder="Enter header value" />

                                                    </div>

                                                    <div class="parameter-label-and-input">

                                                        <label class="input-label">Header Description</label>

                                                        <textarea class="modal-description-textarea parameter-input" v-model=" header.description " placeholder="Enter header description : "></textarea>

                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                        <div v-else>

                                            <h4 class="empty-doc" style="text-align:center;margin-top:10px;font-weight:normal;color:#b1b3b6;">We Don't have a Header</h4>

                                            <button @click=" addHeaderContentInDocModal() " style=" text-align: center; margin: 10px auto 0; display: block; color: #16A085; background: transparent; padding: 8px 12px; border: 1px solid #16A085; border-radius: 5px; cursor: pointer;">Add</button>
                                        
                                        </div>
                                    
                                    </div>
                                    
                                </div>


                                <div class="modal-input-container">

                                    <label for="response" class="input-label parameter-label">Response</label>

                                    <div class="parameter-section" id="response">

                                        <div v-if=" docCreateSection.responses.length > 0 ">

                                            <div v-for="(response,index) in docCreateSection.responses" :key="index">

                                                <div class="parameter-row">

                                                    <h5 class="parameter-section-row-item add" @click=" addResponseContentInDocModal() ">Add</h5>

                                                    <h5 class="parameter-section-row-item field-num">Field Number {{ index + 1 }}</h5>

                                                    <h5 class="parameter-section-row-item delete" @click=" deleteResponseContentInDocModal(response.id) ">Delete</h5>

                                                </div>

                                                <div class="parameter-section-item">

                                                    <div class="parameter-label-and-input">

                                                        <label class="input-label">Response Code</label>

                                                        <input type="text" autocomplete="off" v-model=" response.code " class="input parameter-input" placeholder="Enter Response Code" />

                                                    </div>

                                                    <div class="parameter-label-and-input">

                                                        <label class="input-label">Response Body</label>

                                                        <textarea class="modal-description-textarea parameter-input" v-model=" response.body " placeholder="Enter Response Body : "></textarea>

                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                        <div v-else>

                                            <h4 class="empty-doc" style="text-align:center;margin-top:10px;font-weight:normal;color:#b1b3b6;">We Don't have a Response</h4>

                                            <button type="button" @click.prevent=" addResponseContentInDocModal() " style=" text-align: center; margin: 10px auto 0; display: block; color: #16A085; background: transparent; padding: 8px 12px; border: 1px solid #16A085; border-radius: 5px; cursor: pointer;">Add</button>
                                        
                                        </div>
                                    
                                    </div>
                                    
                                </div>


                                <button type="submit" class="modal-button create-modal-button">Create</button>

                            </form>

                        </div>

                        <div class="modal-footer"></div>

                    </div>

                    <div class="overlay" @click=" docModal = false "></div>

                </div>
            
            </transition>


            <!-- doc update modal -->
            <transition name="fade">

                <div v-if=" updateDocModalOpen == true " class="modal" >

                    <div class="modal-section">

                        <div class="modal-header">

                            <h3 class="modal-name">Update Doc ( Path SubSet ) </h3>

                        </div>

                        <div class="modal-body">

                            <form class="modal-input" @submit.prevent="updateDoc() ">

                                <div class="modal-input-container">

                                    <label for="title" class="input-label">Title</label>

                                    <input type="text" autocomplete="off" v-model="docCreateSection.title" class="input" id="title" placeholder="Please enter title : " required />

                                </div>


                                <div class="modal-input-container">

                                    <label for="sub-title" class="input-label">Sub Title</label>

                                    <input type="text" autocomplete="off" v-model="docCreateSection.sub_title" class="input" id="sub-title" placeholder="Please enter sub title : " />

                                </div>


                                <div class="modal-input-container">

                                    <label for="description" class="input-label">Description</label>

                                    <textarea class="modal-description-textarea"  v-model="docCreateSection.description" id="description" placeholder="Please enter description : "></textarea>

                                </div>

                                
                                <div class="modal-input-container">

                                    <label for="method" class="input-label">Method</label>

                                    <input type="text" autocomplete="off" v-model="docCreateSection.method" class="input" id="method" placeholder="Please enter method : " required />

                                </div>


                                <div class="modal-input-container">

                                    <label for="full-route" class="input-label">Full Route</label>

                                    <input type="text" autocomplete="off" v-model="docCreateSection.full_route" class="input" id="full-route" placeholder="Please enter full route : " required />

                                </div>


                                <div class="modal-input-container">

                                    <label for="parameters" class="input-label parameter-label">Parameters</label>

                                    <div class="parameter-section" id="parameters">

                                        <div v-if=" docCreateSection.parameters.length > 0 ">

                                            <div v-for="(parameter,index) in docCreateSection.parameters" :key="index">

                                                <div class="parameter-row">

                                                    <h5 class="parameter-section-row-item add" @click=" addParameterContentInDocModal() ">Add New</h5>

                                                    <h5 class="parameter-section-row-item field-num">Field Number {{ index + 1 }}</h5>

                                                    <h5 class="parameter-section-row-item delete" @click=" deleteParameterContentInDocModal(parameter.id) ">Delete</h5>

                                                </div>

                                                <div class="parameter-section-item">

                                                    <div class="parameter-label-and-input">

                                                        <label class="input-label">Attribute Name</label>

                                                        <input type="text" autocomplete="off" v-model="parameter.name" class="input parameter-input" placeholder="Enter attribute name" required/>

                                                    </div>

                                                    <div class="parameter-label-and-input">

                                                        <label class="input-label">Attribute Data Type</label>

                                                        <input type="text" autocomplete="off" v-model="parameter.data_type" class="input parameter-input" placeholder="Enter attribute data type" required/>

                                                    </div>

                                                    <div class="parameter-label-and-input">

                                                        <label class="input-label">Attribute Description</label>

                                                        <textarea class="modal-description-textarea parameter-input" v-model="parameter.description"  placeholder="Enter header description : "></textarea>

                                                    </div>

                                                    <div class="parameter-label-and-input">

                                                        <label class="input-label">Attribute Example</label>

                                                        <input type="text" autocomplete="off" v-model="parameter.example" class="input parameter-input" placeholder="Enter attribute example" />

                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                        <div v-else>

                                            <h4 class="empty-doc" style="text-align:center;margin-top:10px;font-weight:normal;color:#b1b3b6;">We Don't have a Parameter</h4>

                                            <button @click=" addParameterContentInDocModal() " style=" text-align: center; margin: 10px auto 0; display: block; color: #16A085; background: transparent; padding: 8px 12px; border: 1px solid #16A085; border-radius: 5px; cursor: pointer;">Add</button>
                                        
                                        </div>
                                    
                                    </div>
                                    

                                </div>


                                <div class="modal-input-container">

                                    <label for="headers" class="input-label parameter-label">Headers</label>

                                    <div class="parameter-section" id="headers">

                                        <div v-if=" docCreateSection.headers.length > 0 ">

                                            <div v-for="(header,index) in docCreateSection.headers" :key="index">

                                                <div class="parameter-row">

                                                    <h5 class="parameter-section-row-item add" @click=" addHeaderContentInDocModal() ">Add</h5>

                                                    <h5 class="parameter-section-row-item field-num">Field Number {{ index + 1 }}</h5>

                                                    <h5 class="parameter-section-row-item delete" @click=" deleteHeaderContentInDocModal(header.id) ">Delete</h5>

                                                </div>

                                                <div class="parameter-section-item">

                                                    <div class="parameter-label-and-input">

                                                        <label class="input-label">Header Name</label>

                                                        <input type="text" autocomplete="off" v-model=" header.name " class="input parameter-input" placeholder="Enter header name" />

                                                    </div>

                                                    <div class="parameter-label-and-input">

                                                        <label class="input-label">Header Value</label>

                                                        <input type="text" autocomplete="off" v-model=" header.value " class="input parameter-input" placeholder="Enter header value" />

                                                    </div>

                                                    <div class="parameter-label-and-input">

                                                        <label class="input-label">Header Description</label>

                                                        <textarea class="modal-description-textarea parameter-input" v-model=" header.description " placeholder="Enter header description : "></textarea>

                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                        <div v-else>

                                            <h4 class="empty-doc" style="text-align:center;margin-top:10px;font-weight:normal;color:#b1b3b6;">We Don't have a Header</h4>

                                            <button @click=" addHeaderContentInDocModal() " style=" text-align: center; margin: 10px auto 0; display: block; color: #16A085; background: transparent; padding: 8px 12px; border: 1px solid #16A085; border-radius: 5px; cursor: pointer;">Add</button>
                                        
                                        </div>
                                    
                                    </div>
                                    
                                </div>


                                <div class="modal-input-container">

                                    <label for="response" class="input-label parameter-label">Response</label>

                                    <div class="parameter-section" id="response">

                                        <div v-if=" docCreateSection.responses.length > 0 ">

                                            <div v-for="(response,index) in docCreateSection.responses" :key="index">

                                                <div class="parameter-row">

                                                    <h5 class="parameter-section-row-item add" @click=" addResponseContentInDocModal() ">Add</h5>

                                                    <h5 class="parameter-section-row-item field-num">Field Number {{ index + 1 }}</h5>

                                                    <h5 class="parameter-section-row-item delete" @click=" deleteResponseContentInDocModal(response.id) ">Delete</h5>

                                                </div>

                                                <div class="parameter-section-item">

                                                    <div class="parameter-label-and-input">

                                                        <label class="input-label">Response Code</label>

                                                        <input type="text" autocomplete="off" v-model=" response.code " class="input parameter-input" placeholder="Enter Response Code" />

                                                    </div>

                                                    <div class="parameter-label-and-input">

                                                        <label class="input-label">Response Body</label>

                                                        <textarea class="modal-description-textarea parameter-input" v-model=" response.body " placeholder="Enter Response Body : "></textarea>

                                                    </div>


                                                </div>

                                            </div>

                                        </div>

                                        <div v-else>

                                            <h4 class="empty-doc" style="text-align:center;margin-top:10px;font-weight:normal;color:#b1b3b6;">We Don't have a Response</h4>

                                            <button @click=" addResponseContentInDocModal() " style=" text-align: center; margin: 10px auto 0; display: block; color: #16A085; background: transparent; padding: 8px 12px; border: 1px solid #16A085; border-radius: 5px; cursor: pointer;">Add</button>
                                        
                                        </div>
                                    
                                    </div>
                                    
                                </div>


                                <button type="submit" class="modal-button create-modal-button" style="background:#F49C2E">Update</button>

                            </form>

                        </div>

                        <div class="modal-footer"></div>

                    </div>

                    <div class="overlay" @click=" cancelUpdateDocModal() "></div>

                </div>
            
            </transition>


            <!-- doc delete modal -->
            <transition name="fade">

                <div v-if=" deleteDocModalOpen == true " class="modal" >

                    <div class="modal-section">

                        <div class="modal-header">

                            <h3 class="modal-name">Delete Doc</h3>

                        </div>

                        <div class="modal-body">

                            <h2 class="modal-delete-title">Do you want Delete This Doc ?</h2>

                            <div class="delete-buttons">

                                <button type="button" @click=" deleteDocModalOpen = false " class="cancel-button">Cancel</button>

                                <button type="button" class="delete-button" @click=" deleteDocModal() ">Delete</button>

                            </div>

                        </div>

                    </div>

                    <div class="overlay" @click=" deleteDocModalOpen = false "></div>

                </div>
            
            </transition>


            <!-- schema create modal -->
            <transition name="fade">

                <div v-if=" schemaModal == true " class="modal" >

                    <div class="modal-section">

                        <div class="modal-header">

                            <h3 class="modal-name">Create Schema ( Database Models ) </h3>

                        </div>

                        <div class="modal-body">

                            <form class="modal-input" @submit.prevent=" createSchema() ">

                                <div class="modal-input-container">

                                    <label for="schema-title" class="input-label">Title</label>

                                    <input type="text" autocomplete="off" v-model="schemaCreateSection.title" class="input" id="schema-title" placeholder="Please enter title : " />

                                </div>


                                <div class="modal-input-container">

                                    <label for="schema-summary" class="input-label">Summary</label>

                                    <input type="text" autocomplete="off" v-model="schemaCreateSection.summary" class="input" id="schema-summary" placeholder="Please enter summary : " />

                                </div>


                                <div class="modal-input-container">

                                    <label for="schema-description" class="input-label">Description</label>

                                    <textarea class="modal-description-textarea"  v-model="schemaCreateSection.description" id="schema-description" placeholder="Please enter description : "></textarea>

                                </div>


                                <div class="modal-input-container">

                                    <label for="schema" class="input-label parameter-label">Fields</label>

                                    <div class="parameter-section" id="schema">

                                        <div v-if=" schemaCreateSection.fields.length > 0 ">

                                            <div v-for="( field , index ) in schemaCreateSection.fields" :key="index">

                                                <div class="parameter-row">

                                                    <h5 class="parameter-section-row-item add" @click=" addFieldContentInSchemaModal() ">Add New</h5>

                                                    <h5 class="parameter-section-row-item field-num">Field Number {{ index + 1 }}</h5>

                                                    <h5 class="parameter-section-row-item delete" @click=" deleteFieldContentInSchemaModal(field.id) ">Delete</h5>

                                                </div>

                                                <div class="parameter-section-item">

                                                    <div class="parameter-label-and-input">

                                                        <label class="input-label">Field Name</label>

                                                        <input type="text" autocomplete="off" v-model="field.name" class="input parameter-input" placeholder="Enter field name" />

                                                    </div>

                                                    <div class="parameter-label-and-input">

                                                        <label class="input-label">Field Data Type</label>

                                                        <input type="text" autocomplete="off" v-model="field.data_type" class="input parameter-input" placeholder="Enter field data type" />

                                                    </div>

                                                    <div class="parameter-label-and-input">

                                                        <label class="input-label">Field Description</label>

                                                        <textarea class="modal-description-textarea parameter-input" v-model="field.description" placeholder="Enter field description : "></textarea>

                                                    </div>

                                                    <div class="parameter-label-and-input">

                                                        <label class="input-label">Field Example</label>

                                                        <input type="text" autocomplete="off" v-model="field.example" class="input parameter-input" placeholder="Enter field example" />

                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                        <div v-else>

                                            <h4 class="empty-doc" style="text-align:center;margin-top:10px;font-weight:normal;color:#b1b3b6;">We Don't have a Schema</h4>

                                            <button type="button" @click=" addFieldContentInSchemaModal() " style=" text-align: center; margin: 10px auto 0; display: block; color: #16A085; background: transparent; padding: 8px 12px; border: 1px solid #16A085; border-radius: 5px; cursor: pointer;">Add</button>
                                        
                                        </div>
                                    
                                    </div>
                                    

                                </div>


                                <button type="submit" class="modal-button create-modal-button">Create</button>

                            </form>

                        </div>

                        <div class="modal-footer"></div>

                    </div>

                    <div class="overlay" @click=" schemaModal = false "></div>

                </div>
            
            </transition>


            <!-- schema update modal -->
            <transition name="fade">

                <div v-if=" updateSchemaModalOpen == true " class="modal" >

                    <div class="modal-section">

                        <div class="modal-header">

                            <h3 class="modal-name">Update Schema ( Database Models ) </h3>

                        </div>

                        <div class="modal-body">

                            <form class="modal-input" @submit.prevent=" updateSchema() ">

                                <div class="modal-input-container">

                                    <label for="schema-title" class="input-label">Title</label>

                                    <input type="text" autocomplete="off" v-model="schemaCreateSection.title" class="input" id="schema-title" placeholder="Please enter title : " />

                                </div>


                                <div class="modal-input-container">

                                    <label for="schema-summary" class="input-label">Summary</label>

                                    <input type="text" autocomplete="off" v-model="schemaCreateSection.summary" class="input" id="schema-summary" placeholder="Please enter summary : " />

                                </div>


                                <div class="modal-input-container">

                                    <label for="schema-description" class="input-label">Description</label>

                                    <textarea class="modal-description-textarea"  v-model="schemaCreateSection.description" id="schema-description" placeholder="Please enter description : "></textarea>

                                </div>


                                <div class="modal-input-container">

                                    <label for="schema-update" class="input-label parameter-label">Fields</label>

                                    <div class="parameter-section" id="schema-update">

                                        <div v-if=" schemaCreateSection.fields.length > 0 ">

                                            <div v-for="( field , index ) in schemaCreateSection.fields" :key="index">

                                                <div class="parameter-row">

                                                    <h5 class="parameter-section-row-item add" @click=" addFieldContentInSchemaModal() ">Add New</h5>

                                                    <h5 class="parameter-section-row-item field-num">Field Number {{ index + 1 }}</h5>

                                                    <h5 class="parameter-section-row-item delete" @click=" deleteFieldContentInSchemaModal(field.id) ">Delete</h5>

                                                </div>

                                                <div class="parameter-section-item">

                                                    <div class="parameter-label-and-input">

                                                        <label class="input-label">Field Name</label>

                                                        <input type="text" autocomplete="off" v-model="field.name" class="input parameter-input" placeholder="Enter field name" />

                                                    </div>

                                                    <div class="parameter-label-and-input">

                                                        <label class="input-label">Field Data Type</label>

                                                        <input type="text" autocomplete="off" v-model="field.data_type" class="input parameter-input" placeholder="Enter field data type" />

                                                    </div>

                                                    <div class="parameter-label-and-input">

                                                        <label class="input-label">Field Description</label>

                                                        <textarea class="modal-description-textarea parameter-input" v-model="field.description" placeholder="Enter field description : "></textarea>

                                                    </div>

                                                    <div class="parameter-label-and-input">

                                                        <label class="input-label">Field Example</label>

                                                        <input type="text" autocomplete="off" v-model="field.example" class="input parameter-input" placeholder="Enter field example" />

                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                        <div v-else>

                                            <h4 class="empty-doc" style="text-align:center;margin-top:10px;font-weight:normal;color:#b1b3b6;">We Don't have a Schema</h4>

                                            <button type="button" @click=" addFieldContentInSchemaModal() " style=" text-align: center; margin: 10px auto 0; display: block; color: #16A085; background: transparent; padding: 8px 12px; border: 1px solid #16A085; border-radius: 5px; cursor: pointer;">Add</button>
                                        
                                        </div>
                                    
                                    </div>
                                    

                                </div>


                                <button type="submit" class="modal-button create-modal-button" style="background:#F49C2E">Update</button>

                            </form>

                        </div>

                        <div class="modal-footer"></div>

                    </div>

                    <div class="overlay" @click=" cancelUpdateSchemaModal() "></div>

                </div>
            
            </transition>


            <!-- schema delete modal -->
            <transition name="fade">

                <div v-if=" deleteSchemaModalOpen == true " class="modal" >

                    <div class="modal-section">

                        <div class="modal-header">

                            <h3 class="modal-name">Delete Schema</h3>

                        </div>

                        <div class="modal-body">

                            <h2 class="modal-delete-title">Do you want Delete This Schema ?</h2>

                            <div class="delete-buttons">

                                <button type="button" @click=" deleteSchemaModalOpen = false " class="cancel-button">Cancel</button>

                                <button type="button" class="delete-button" @click=" deleteSchemaModal() ">Delete</button>

                            </div>

                        </div>

                    </div>

                    <div class="overlay" @click=" deleteSchemaModalOpen = false "></div>

                </div>
            
            </transition>


        </div>

        <!-- doc sidebar -->
        <div v-if=" docSidebar == true " style="position:relative;z-index:1000001;min-width:100%;min-height:100%">

            <div class="sidebar" id="doc-sidebar">

                <div class="sidebar-container">

                    <div class="sidebar-close" @click=" closeDocSidebar() ">&times;</div>

                    <div class="sidebar-top-content">

                        <h2 class="sidebar-title" style="text-transform:capitalize;">{{docSingle.title}}</h2>

                        <h4 class="sidebar-sub-title" style="text-transform:capitalize;">{{docSingle.sub_title}}</h4>

                    </div>

                    <div class="sidebar-hr" :class="BackgroundColorMethodSidebar(docSingle.method)"></div>

                    <p class="sidebar-description" v-if=" docSingle.description != undefined && docSingle.description.length > 0 ">{{ docSingle.description }}</p>

                    <div class="method-and-route">

                        <p class="sidebar-method" style="text-transform:uppercase;" :class="ColorMethodSidebar(docSingle.method)">{{ docSingle.method }}</p>

                        <p class="sidebar-route">{{docSingle.full_route}}</p>

                    </div>

                    <div class="sidebar-field-section">

                        <h4 class="field-title">Parameters</h4>

                        <div class="sidebar-hr" v-if=" docSingle.parameters == undefined || docSingle.parameters.length <= 0" :class="BackgroundColorMethodSidebar(docSingle.method)"></div>

                        <div v-if=" docSingle.parameters != undefined && docSingle.parameters.length > 0 ">

                            <div class="header-field">

                                <p class="header-field-item item-name">Name</p>

                                <p class="header-field-item item-type">Type</p>

                                <p class="header-field-item item-description">Description</p>

                                <p class="header-field-item item-example " style="text-align:center;">Example</p>

                            </div>

                            <div class="sidebar-hr" :class="BackgroundColorMethodSidebar(docSingle.method)"></div>

                            <div class="body-field" v-for="(param,index) in docSingle.parameters" :key="index">

                                <div class="body-box">

                                    <p class="body-box-item box-item-name">{{ param.name }}</p>

                                    <p class="body-box-item box-item-type">{{ param.data_type }}</p>

                                    <p class="body-box-item box-item-description">{{ param.description.slice(0,20) }}</p>

                                    <p class="body-box-item box-item-example" >{{ param.example.slice(0,20) }}</p>

                                </div>

                                <div class="sidebar-hr" :class="BackgroundColorMethodSidebar(docSingle.method)"></div>

                            </div>

                        </div>

                        <h4 v-else class="empty-message-sidebar"> We Not Have A Parameter </h4>

                    </div>

                    <div class="header-section">

                        <h4 class="header-title">Headers</h4>

                        <div class="sidebar-hr" v-if=" docSingle.headers == undefined || docSingle.headers.length <= 0" :class="BackgroundColorMethodSidebar(docSingle.method)"></div>

                        <div v-if=" docSingle.headers != undefined && docSingle.headers.length > 0 ">

                            <div class="header-box">

                                <div class="header-box-item" v-for="( head , index ) in docSingle.headers " :key="index">

                                    <div class="header-content">

                                        <span class="header-name">{{ head.name }}</span>

                                        <span class="header-dots">:</span>

                                        <span class="header-value">{{ head.value }}</span>

                                    </div>

                                    <p class="header-description">
                                        // {{ head.description }}
                                    </p>


                                </div>

                            </div>

                        </div>

                        <h4 v-else class="empty-message-sidebar"> We Not Have A Header </h4>

                        

                    </div>

                    <div class="sidebar-response">

                        <h4 class="sidebar-response-title">Response</h4>

                        <div v-if=" docSingle.responses != undefined && docSingle.responses.length > 0 ">

                            <div class="sidebar-response-box" v-for=" (response,index) in docSingle.responses " :key="index" >

                                <h5 class="sidebar-response-code">Code {{ response.code }} Response</h5>

                                <div class="json-style-container">

                                    <div class="json-style">

                                        <p class="json" v-html='JsonDisign(response.body)'></p>

                                    </div>

                                </div>

                            </div>

                        </div>

                        <h4 v-else class="empty-message-sidebar"> We Not Have A Response </h4>
                    
                    </div>

                </div>

            </div>

            <div class="overlay" @click=" closeDocSidebar() "></div>

        </div>


        <!-- schema sidebar -->
        <div v-if=" schemaSidebar == true " style="position:relative;z-index:1000001;min-width:100%;min-height:100%">

            <div class="sidebar" id="schema-sidebar">

                <div class="sidebar-container">

                    <div class="sidebar-close" @click=" closeSchemaSidebar() ">&times;</div>

                    <div class="sidebar-top-content">

                        <h2 class="sidebar-title">{{schemaSingle.title}}</h2>

                        <h4 class="sidebar-sub-title">{{schemaSingle.summary}}</h4>

                    </div>

                    <div class="sidebar-hr" :class="BackgroundColorMethodSidebar('get')"></div>

                    <p class="sidebar-description" v-if=" schemaSingle.description != undefined && schemaSingle.description.length > 0 ">{{ schemaSingle.description }}</p>

                    <div class="sidebar-field-section" style="margin-top:70px;">

                        <h4 class="field-title">Fields</h4>

                        <div class="sidebar-hr" v-if=" schemaSingle.fields == undefined || schemaSingle.fields.length <= 0" :class="BackgroundColorMethodSidebar('get')"></div>

                        <div v-if=" schemaSingle.fields != undefined && schemaSingle.fields.length > 0 ">

                            <div class="header-field">

                                <p class="header-field-item item-name">Name</p>

                                <p class="header-field-item item-type">Type</p>

                                <p class="header-field-item item-description">Description</p>

                                <p class="header-field-item item-example " style="text-align:center;">Example</p>

                            </div>

                            <div class="sidebar-hr" :class="BackgroundColorMethodSidebar('get')"></div>

                            <div class="body-field" v-for="(field,index) in schemaSingle.fields" :key="index">

                                <div class="body-box">

                                    <p class="body-box-item box-item-name">{{ field.name }}</p>

                                    <p class="body-box-item box-item-type">{{ field.data_type }}</p>

                                    <p class="body-box-item box-item-description">{{ field.description.slice(0,20) }}</p>

                                    <p class="body-box-item box-item-example" >{{ field.example.slice(0,20) }}</p>

                                </div>

                                <div class="sidebar-hr" :class="BackgroundColorMethodSidebar('get')"></div>

                            </div>

                        </div>

                        <h4 v-else class="empty-message-sidebar"> We Not Have A Field </h4>

                    </div>

                </div>

            </div>

            <div class="overlay" @click=" closeSchemaSidebar() "></div>

        </div>

    </div>

</template>


<style lang="scss" scoped>

  *{
    font-family: 'Roboto', sans-serif!important;
  }


    .single-api{
        position: relative;

        .container{
            min-width:92%;
            max-width: 96%;
            margin:40px auto;

            .welcome-text{
                color:#C2C7CD;
                font-weight:500;
                margin-bottom:12px;
            }

            .title{
                padding-bottom:12px;
                font-weight:bold;
                font-size:20px;
                color:#34383E;
            }

            .vertical-line{
                border:1px solid #f5f5f5;
                width:100%;
                height:1px;
            }

            .api-description{
                text-align: justify;
                font-size:16px;
                color:#B9BEC5;
                margin-top:12px;
                line-height: 1.75;
                padding-left: 12px;
                padding-right: 12px;
            }

            .title-item{
                margin-top:40px;

                .row{
                    display:flex;
                    justify-content: space-between;
                    align-items: center;

                    .title-button-link{
                        background:transparent;
                        align-self: center;
                        margin-top:-8px;
                        color:#34383E;
                        font-size:18px;
                        cursor: pointer;
                    }

                }

                .content-section{
                    padding:25px 12px;

                    .content-title{
                        margin-bottom:15px;
                        color:#34383E;
                        text-transform: capitalize;

                        .create-new-path{
                            color:#2980b9;
                            font-size:12px;
                            cursor: pointer;
                        }
                    }

                    .content-item{
                        border-top-right-radius: 5px;
                        border-bottom-right-radius: 5px;
                        padding:12px 15px;
                        background:#F5F6F7;
                        display: flex;
                        align-items: center;
                        cursor: pointer;

                        .content-item-title-and-subtitle{
                            display:block;

                            .content-item-title{
                                color:#34383E;
                                font-size:14px;
                                margin-bottom: 5px;
                                font-weight:bold;
                                text-transform: capitalize;
                            }

                            .content-item-subtitle{
                                font-size:12px;
                                color:#999ca2;
                                text-transform: capitalize;
                            }

                        }

                        .content-item-title{
                            color:#999ca2;
                            margin-right:20px;
                        }

                        .content-item-request-type{
                            width:auto;
                            color:#fff;
                            font-size:14px;
                            padding:10px 12px;
                            border-radius:4px;
                            margin-right:20px;
                            width: 80px;
                            text-align: center;
                        }

                        .background-get-method{
                            background:#5EAAF6;
                        }

                        .background-post-method{
                            background:#49CC90;
                        }

                        .background-put-method{
                            background:#F49C2E;
                        }

                        .background-patch-method{
                            background:#2ecc71;
                        }

                        .background-delete-method{
                            background:#F13333;
                        }

                        .background-other-method{
                            background:#8e44ad;
                        }

                    }

                    .content-item-description{
                        // color:#CFD2D7;
                        text-align: justify;
                        font-size:14px;
                        color:#b1b3b6;
                        margin-top:12px;
                        line-height: 1.75;
                        margin-bottom:20px;
                        padding-left: 10px;
                        padding-right: 12px;
                    }

                    .border-color-get-method{
                        border-left:5px solid #5EAAF6;
                    }

                    .border-color-post-method{
                        border-left:5px solid #49CC90;
                    }

                    .border-color-put-method{
                        border-left:5px solid #F49C2E;
                    }

                    .border-color-patch-method{
                        border-left:5px solid #2ecc71;
                    }

                    .border-color-delete-method{
                        border-left:5px solid #F13333;
                    }

                    .border-color-other-method{
                        border-left:5px solid #8e44ad;
                    }

                }

                .empty-path-schema{

                    margin-top:15px;
                    text-align:center;
                    color:#B9BED0;
                    
                    h3{
                        font-size:28px;
                        font-weight:normal;
                    }


                }

            }

            .margin-top-little{
                margin-top:40px!important;
            }

            .schema-section{
                margin-bottom: 105px;

                .schema-section-item{
                    margin-top:15px;
                    width:100%;
                    border-radius:3px;
                    padding:20px 15px;
                    background:#F5F6F7;
                    border-left:5px solid rgb(44, 62, 80);
                    color:rgb(44, 62, 80);
                    cursor: pointer;

                    .schema-title{
                        font-size:18px;
                        font-weight:bold;
                    }
                }

                .schema-description{
                        text-align: justify;
                        font-size:14px;
                        color:#b1b3b6;
                        margin-top:12px;
                        line-height: 1.75;
                        margin-bottom:20px;
                        padding-left: 10px;
                        padding-right: 12px;
                    }

                .schema-section-item-background-one{
                    border-left:5px solid #5EAAF6;
                    color:#5EAAF6;
                }

                .schema-section-item-background-two{
                    border-left:5px solid #49CC90;
                    color:#49CC90;
                }

                .schema-section-item-background-three{
                    border-left:5px solid #F49C2E;
                    color:#F49C2E;
                }

                .schema-section-item-background-four{
                    border-left:5px solid #2ecc71;
                    color:#2ecc71;
                }

                .schema-section-item-background-blue-five{
                    border-left:5px solid #F13333;
                    color:#F13333;
                }

                .schema-section-item-background-six{
                    border-left:5px solid #8e44ad;
                    color:#8e44ad;
                }

            }

        }

        .hoverable-path-paper{
            box-shadow: 0 0 3px 2px #eee;
        }

        .hoverable-schema-paper{
            // box-shadow: 0 0 2px 0px #eee;
        }

        .hoverable-path-paper,.hoverable-schema-paper{
            position: absolute;
            background:#fff;
            min-width:80px;
            height:auto;
            text-align: center;
            border-radius: 4px;
            display: none;

            button{
                width:100%;
                padding-top:15px;
                padding-bottom: 15px;
                cursor: pointer;
                text-align:center;
                font-size:16px;
                background:transparent;
                border-bottom: 1px solid #eee;
                transition: all 0.3s ease-out;
                font-weight:bold;
                border-radius: 4px;
            }

            .update-btn{
                color:#F49C2E;

                &:hover{
                    background:#F49C2E;
                    color:#fff;
                }
            }

            .delete-btn{
                color: #F13333;
                &:hover{
                    background:#F13333;
                    color:#fff;
                }
            }
        }

    }

    .sidebar{
        background:#2E343B;
        position:fixed;
        overflow-y: auto;
        top:0;
        right:-510px;
        bottom:0;
        z-index:100001;
        max-width:500px;
        width:500px;
        min-width:300px;

        &::-webkit-scrollbar {
            width: 0px!important;
        }

        &::-webkit-scrollbar-track {
            width:0!important;
        }
        
        &::-webkit-scrollbar-thumb {
            background-color: transparent;
            width:0!important;
        }

        .sidebar-container{
            min-height:100%;
            margin:75px auto 20px;
            position:relative;
            z-index:100001;

            .sidebar-close{
                color:#fff;
                font-size:35px;
                position: absolute;
                top:-60px;
                left:7.5%;
                cursor: pointer;
            }

            .sidebar-top-content{
                width:85%;
                margin-right:auto;
                margin-left:auto;
                .sidebar-title{
                    font-size:20px;
                    font-weight:bold;
                    text-transform: capitalize;
                    color:#fff;
                }

                .sidebar-sub-title{
                    font-size:12px;
                    text-transform: capitalize;
                    font-weight: normal;
                    color:#dad6d6;
                    margin:10px 0px 12px 2px;
                }
            }

            .sidebar-description{
                width: 85%;
                margin:12px auto 15px;
                line-height: 1.75;
                text-align: justify;
                font-size: 13px;
                color: #e1e1e1;
            }

            .sidebar-hr{
                width: 100%;
                height:2px;
                background:#484F58; 
            }

            .background-get-method{
                background :#5EAAF6;
            }

            .background-post-method{
                background :#49CC90;
            }

            .background-put-method{
                background :#F49C2E;
            }

            .background-patch-method{
                background :#2ecc71;
            }

            .background-delete-method{
                background :#F13333;
            }

            .background-other-method{
                background :#8e44ad;
            }

            .method-and-route{
                margin:0 auto 40px;
                display: flex;
                align-items: center;
                width:85%;
                justify-content: flex-start;

                .sidebar-method{
                    padding:8px 15px;
                    background:#272D33;
                    text-align: center;
                    border-radius: 5px;
                    font-size:13px;
                    color:#2ecc71;
                    font-weight:bold;
                    text-transform: uppercase;
                }

                .sidebar-route{
                    margin-left:10px;
                    font-size:13px;
                    color:#F3F3F4;
                }

                .color-get-method{
                    color :#5EAAF6;
                }

                .color-post-method{
                    color :#49CC90;
                }

                .color-put-method{
                    color :#F49C2E;
                }

                .color-patch-method{
                    color :#2ecc71;
                }

                .color-delete-method{
                    color :#F13333;
                }

                .color-other-method{
                    color :#8e44ad;
                }

            }

            .sidebar-field-section{
                margin:0 auto 20px;
                text-align: center;

                .field-title{
                    text-align: center;
                    color:#F3F3F4;
                    width:85%;
                    margin:0 auto 22px;
                    font-weight: normal;
                }

                .header-field{
                    display: flex;
                    width:100%;
                    margin:0 auto;
                    justify-content: space-between;
                    padding-bottom: 12px;
                    
                    .header-field-item{
                        color:#CECFCF;
                        font-size:14px;
                        font-weight: bold;
                        width:25%;
                    }
                }

                .body-box{
                    display: flex;
                    width: 100%;
                    margin:25px auto 25px;
                    align-items: center;
                    justify-content: space-between;

                    .body-box-item{
                        color:#CECFCF;
                        font-size:13px;
                        width:25%;
                        display:block;
                        text-transform: capitalize;
                    }

                }

            }

            .header-section{
                padding-top:45px;
                margin:20px auto 20px;
                text-align: center;

                .header-title{
                    color:#F3F3F4;
                    text-align: center;
                    width:85%;
                    margin:0 auto 15px;
                    font-weight: normal;
                }

                .header-box{
                    width:90%;
                    margin:0 auto 12px;
                    background:#272D33;
                    border-radius:5px;
                    padding:15px 15px 1px;
                    text-align:left;
                    display:block;

                    .header-box-item{
                        margin-bottom:12px;
                        text-transform: capitalize;

                        .header-content{
                            display:flex;
                            align-items: center;
                            
                        }

                        .header-name{
                            color:#579BE9;
                            margin-right:8px;
                            font-size:14px;
                            font-weight:bold;
                        }

                        .header-dots{
                            color:#fff;
                            font-size: 14px;
                            font-weight:bold;
                            margin-right: 8px;
                        }
                        
                        .header-value{
                            color:#49cc90;
                            font-size: 14px;
                            font-weight:bold;
                            margin-right: 8px;
                        }

                        .header-description{
                            margin-top: 8px;
                            font-size: 14px;
                            color: #757575;
                        }

                    }

                }

            }

            .sidebar-response{
                .sidebar-response-title{
                    padding-top:40px;
                    text-align: center;
                    color:#F3F3F4;
                    width:85%;
                    margin:0 auto -10px;
                    font-weight: normal;
                }

                .sidebar-response-box{

                    margin-top:40px;

                    .json-style-container{
                        width:90%;
                        border-radius:5px;
                        background:#272D33;
                        margin-right:auto;
                        margin-left:auto;
                        
                        .json-style{
                            background:#272d33;
                            padding:15px 15px;
                            border-radius:5px;
                            word-break:break-all;
                            line-height:1.75;
                        }


                    }

                    .sidebar-response-code{
                        margin-bottom:10px;
                        width:90%;
                        margin-right:auto;
                        margin-left:auto;
                        text-align:left;
                        color:#F3F3F4;
                        font-size:12px;
                        font-weight: bold;
                    }
                    
                }
            }

            .empty-message-sidebar{
                text-align: center;
                color:#b1b3b6;
                font-size:18px;
                margin-top:12px;
            }
            
        }

    }


    .overlay{
        min-height: 100vh;
        min-width: 100vw;
        background:rgba(87, 87, 87 , 0.6);
        cursor:pointer;
        position: fixed;
        top:0;
        left:0;
        bottom:0;
        right:0;
        z-index: 1000;
    }

</style>


<script>

import FetchToken from '../middleware/fetchToken';
import HasToken from '../middleware/hasToken';

export default {

    data(){

        return{

            document : [] , 

            pathCreateSection : {

                title : "" ,

                description : "" ,

                route : "" ,

            } ,

            docCreateSection : {

                title : "" , 

                sub_title : "" ,

                description : "" ,

                method : "" ,

                full_route : "" ,

                parameters : [] , 

                headers : [] ,

                responses : [] ,
                
            } , 

            schemaCreateSection : {

                title : "" ,

                summary : "" , 

                description : "" ,

                fields : [] , 

            } ,


            apiUpdate : false ,


            pathModal : false ,

            updatePathModal : false , 

            deletePathModal : false ,


            docModal : false ,
            
            updateDocModalOpen : false ,

            deleteDocModalOpen : false ,


            schemaModal : false ,

            updateSchemaModalOpen : false , 

            deleteSchemaModalOpen : false , 


            changeOrDeleteId : "" , 

            changeOrDeletePathId : "" ,

            changeOrDeleteSchemaId : "" ,

            changeOrDeleteDocId : "" ,


            docSidebar : false , 

            docSingle : "" , 

            schemaSidebar : false , 
            
            schemaSingle : "" ,
            
        }

    },

    methods:{


        // contect menu start

        pathContextMenu( path_id , doc_id ){

            var hoverablePaper = document.querySelector('.hoverable-path-paper');
            var hoverablePaperSchema = document.querySelector('.hoverable-schema-paper');
            hoverablePaper.style.top = event.layerY+"px";
            hoverablePaper.style.left = event.layerX+"px";
            hoverablePaper.style.display = "block";
            hoverablePaperSchema.style.display = "none";

            this.changeOrDeletePathId = path_id;
            this.changeOrDeleteDocId = doc_id;

        } , 


        schemaContextMenu( doc_id , schema_id ){

            var hoverablePaper = document.querySelector('.hoverable-schema-paper');
            var hoverablePaperPath = document.querySelector('.hoverable-path-paper');
            hoverablePaper.style.top = event.layerY+"px";
            hoverablePaper.style.left = event.layerX+"px";
            hoverablePaper.style.display = "block";
            hoverablePaperPath.style.display = "none";

            this.changeOrDeleteDocId = doc_id;
            this.changeOrDeleteSchemaId = schema_id;

        } , 

        // context menu end



        // path section start

        createPath(){

            fetch('http://localhost:8000/path/create' , {

                mode : "cors" , 

                method : "POST" , 

                headers : {

                    "Content-Type":"application/json" , 

                    "Authorization": FetchToken()

                } ,

                body : JSON.stringify({

                    title : this.pathCreateSection.title , 

                    description : this.pathCreateSection.description , 

                    route : this.pathCreateSection.route , 

                    document_id : this.$route.params.id

                })

            } ).then( createPathResponse => {

                    createPathResponse.json().then( () => {

                        this.apiUpdate = true;
                        this.pathModal = false;
                        this.$forceUpdate();

                        this.pathCreateSection = {

                        title : "" ,

                        description : "" ,

                        route : "" ,

                    }

                    } ).catch( error => {

                        console.log(error);

                    } )

                } ).catch( error => {

                    console.log( error );

                } )

        } , 


        createOrUpdatePathModalClose(){

            this.pathModal = false;
            this.updatePathModal = false;

            this.pathCreateSection = {

                title : "" ,

                description : "" ,

                route : "" ,

            };

        } ,

        
        updatePathModalOpen(id){
            var findPathById = this.document.paths.find((val)=>val._id == id);
            this.pathCreateSection = {

                title : findPathById.title ,

                description : findPathById.description ,

                route : findPathById.route ,

            };
            this.changeOrDeleteId = id;
            this.updatePathModal = true;
        } ,


        updatePath(){
            var pathData = this.pathCreateSection;
            pathData.path_id = this.changeOrDeleteId;

            fetch('http://localhost:8000/path/update',{

                mode : "cors" ,

                method : "PUT" ,

                headers : {

                    "Content-Type":"application/json" , 

                    "Authorization": FetchToken()

                } ,

                body : JSON.stringify(pathData)

            }).then( updatePathResponse => {

                updatePathResponse.json().then( ()=> {

                    this.apiUpdate = true;
                    this.updatePathModal = false;
                    this.$forceUpdate();

                    this.pathCreateSection = {

                        title : "" ,

                        description : "" ,

                        route : "" ,

                    }

                } ).catch( error => console.log(error) )

            } ).catch( error => console.log(error) )
            
        } ,


        deletePathModalOpen(id){
            this.changeOrDeleteId = id;
            this.deletePathModal = true;
        } ,


        deletePath(){

            fetch('http://localhost:8000/path/delete' , {

                mode : "cors" , 

                method : "DELETE" , 

                headers : {

                    "Content-Type":"application/json" , 

                    "Authorization": FetchToken()

                } ,

                body : JSON.stringify({

                    path_id : this.changeOrDeleteId

                })

            } ).then( deletePathResponse => {

                deletePathResponse.json().then( ()=> {

                    this.apiUpdate = true;
                    this.deletePathModal = false;
                    this.$forceUpdate();

                } ).catch( error => {

                    console.log(error);

                } )

            } ).catch( error => {

                console.log(error);

            } )

        } ,

        // path section end



        // document section start

        createDoc(){

            var bodyData = this.docCreateSection;
            bodyData.path_id = this.changeOrDeleteId;
            
            fetch(`http://localhost:8000/doc/create`,{

                mode : "cors" , 

                method : "POST" ,

                headers : {

                    "Content-Type":"application/json" , 

                    "Authorization": FetchToken()

                } , 

                body : JSON.stringify(bodyData)

            }).then( createDocResponse => {

                createDocResponse.json().then(()=>{

                    this.docModal = false;
                    this.apiUpdate = true;

                    this.docCreateSection = {

                        route : "" , 

                        sub_title : "" ,

                        description : "" ,

                        method : "" ,

                        full_route : "" ,

                        parameters : [] , 

                        headers : [] ,

                        responses : [] ,
                        
                    }; 

                    this.$forceUpdate();

                }).catch( error => {

                    console.log(error);

                } )

            } ).catch( error => {

                console.log(error);

            } )

        } ,


        addDocModalOpen(path_id){

            this.docModal = true ;

            this.changeOrDeleteId = path_id ;

        } ,


        addParameterContentInDocModal(){

          var uniquePathOldData = this.docCreateSection.parameters;

          uniquePathOldData.push( { id : this.createPassword() , name : "" , data_type : "" , description : "" , example : "" } );

          this.docCreateSection.parameters = uniquePathOldData;

        } ,
        

        deleteParameterContentInDocModal(id){

            var filterParameter = this.docCreateSection.parameters.filter( ( val )=> val.id != id );

            this.docCreateSection.parameters = filterParameter;
            
        } ,


        addHeaderContentInDocModal(){
            
            var uniqueHeaderOldData = this.docCreateSection.headers;

            uniqueHeaderOldData.push({ id : this.createPassword() , name : "" , value : "" , description : "" });

            this.docCreateSection.headers = uniqueHeaderOldData;

        } , 


        deleteHeaderContentInDocModal(id){

            var filterHeader = this.docCreateSection.headers.filter( ( val ) => val.id != id );

            this.docCreateSection.headers = filterHeader;

        } ,


        addResponseContentInDocModal(){
            
            var uniqueResponseOldData = this.docCreateSection.responses;

            uniqueResponseOldData.push({ id : this.createPassword() , code : "" , body : "" });

            this.docCreateSection.responses = uniqueResponseOldData;

        } , 


        deleteResponseContentInDocModal(id){

            var filterResponse = this.docCreateSection.responses.filter( ( val ) => val.id != id );

            this.docCreateSection.responses = filterResponse;

        } ,


        updateDoc(){

            var bodyData = this.docCreateSection;
            bodyData.doc_id = this.changeOrDeleteDocId;
            
            fetch(`http://localhost:8000/doc/update`,{

                mode : "cors" , 

                method : "PUT" ,

                headers : {

                    "Content-Type":"application/json" , 

                    "Authorization": FetchToken()

                } , 

                body : JSON.stringify(bodyData)

            }).then( updateDocResponse => {

                updateDocResponse.json().then( ()=> {

                    this.apiUpdate = true;
                    this.updateDocModalOpen = false;

                    this.docCreateSection = {

                        title : "" , 

                        sub_title : "" ,

                        description : "" ,

                        method : "" ,

                        full_route : "" ,

                        parameters : [] , 

                        headers : [] ,

                        responses : [] ,
                        
                    }

                    this.$forceUpdate();

                } ).catch( error => {

                    console.log(error);

                } )

            } ).catch( error => {

                console.log(error);

            } )

        } ,


        updateDocModal(){

            this.updateDocModalOpen = true;

            var findPath = this.document.paths.find(val=>val._id == this.changeOrDeletePathId);

            var findDoc = findPath.docs.find(val=>val._id == this.changeOrDeleteDocId); 

            this.docCreateSection = {

                title : findDoc.title , 

                sub_title : findDoc.sub_title ,

                description : findDoc.description ,

                method : findDoc.method ,

                full_route : findDoc.full_route ,

                parameters : findDoc.parameters , 

                headers : findDoc.headers ,

                responses : findDoc.responses ,
                
            }
            
        } ,


        cancelUpdateDocModal(){

            this.updateDocModalOpen = false;

            this.docCreateSection = {

                title : "" , 

                sub_title : "" ,

                description : "" ,

                method : "" ,

                full_route : "" ,

                parameters : [] , 

                headers : [] ,

                responses : [] ,
                
            } 

        } ,


        deleteDocModal(){

            fetch(`http://localhost:8000/doc/delete`,{

                mode : "cors" , 

                method : "DELETE" ,

                headers : {

                    "Content-Type":"application/json" , 

                    "Authorization": FetchToken()

                } , 

                body : JSON.stringify({

                    doc_id : this.changeOrDeleteDocId ,

                    path_id : this.changeOrDeletePathId ,

                })

            }).then( deleteDocResponse => {

                deleteDocResponse.json().then( ()=> {

                    this.deleteDocModalOpen = false;

                    this.apiUpdate = true;
                    
                    this.$forceUpdate();

                } ).catch( error => {

                    console.log(error);
                    
                } )

            } ).catch( error => {

                console.log(error);

            } )

        } ,



        // schema section start 

        createSchema(){

            var sendDataObject = this.schemaCreateSection;

            sendDataObject.document_id = this.$route.params.id;


            fetch('http://localhost:8000/scheme/create',{

                mode : "cors" , 

                method : "POST" , 

                headers : {

                    "Content-Type":"application/json" , 

                    "Authorization": FetchToken()

                } , 

                body : JSON.stringify(sendDataObject)

            }).then( createSchemaResponse => {

                createSchemaResponse.json().then( ()=>{

                    this.schemaModal = false;
                    this.apiUpdate = true; 

                    this.$forceUpdate();

                    this.schemaCreateSection = {

                        title : "" ,

                        summary : "" , 

                        description : "" ,

                        fields : [] , 

                    }

                } ).catch(error=>{

                    console.log(error);

                })

            } ).catch(error=>{

                console.log(error);

            })

        } , 


        addFieldContentInSchemaModal(){
            
            var uniqueSchemeFieldOldData = this.schemaCreateSection.fields;

            uniqueSchemeFieldOldData.push({ id : this.createPassword() , name : "" , data_type : "" , description : "" , example : "" });

            this.schemaCreateSection.fields = uniqueSchemeFieldOldData;

        } ,


        deleteFieldContentInSchemaModal(id){

            var filterSchema = this.schemaCreateSection.fields.filter( val => val.id != id );

            this.schemaCreateSection.fields = filterSchema;

        } ,


        updateSchema(){

            var schemeData = this.schemaCreateSection;
            schemeData.scheme_id = this.changeOrDeleteSchemaId;

           fetch('http://localhost:8000/scheme/update',{

                mode : "cors" ,

                method : "PUT" ,

                headers : {

                    "Content-Type":"application/json" , 

                    "Authorization": FetchToken()

                } ,

                body : JSON.stringify(schemeData)

            }).then( updateSchemaResponse => {

                updateSchemaResponse.json().then(()=>{

                    this.updateSchemaModalOpen = false;

                    this.apiUpdate = true;

                    this.schemaCreateSection = {

                        title : "" ,

                        summary : "" , 

                        description : "" ,

                        fields : [] , 

                    };

                    this.$forceUpdate();

                }).catch(error=>{

                    console.log(error);

                })

            } ).catch(error=>{

                console.log(error);

            })

        } , 


        updateSchemaModal(){
            
            var findSchema = this.document.schemes.find( val => val._id == this.changeOrDeleteSchemaId );

            this.schemaCreateSection = {

                title : findSchema.title ,

                summary : findSchema.summary , 

                description : findSchema.description ,

                fields : findSchema.fields , 

            };

            this.updateSchemaModalOpen = true;

        } ,


        cancelUpdateSchemaModal(){

            this.updateSchemaModalOpen = false;

            this.schemaCreateSection = {

                title : "" ,

                summary : "" , 

                description : "" ,

                fields : [] , 

            };

        } ,


        deleteSchemaModal(){

           fetch('http://localhost:8000/scheme/delete',{

                mode : "cors" ,

                method : "DELETE" ,

                headers : {

                    "Content-Type":"application/json" , 

                    "Authorization": FetchToken()

                } ,

                body : JSON.stringify({ scheme_id : this.changeOrDeleteSchemaId })

            }).then( deleteSchemaResponse => {

                deleteSchemaResponse.json().then(()=>{

                    this.deleteSchemaModalOpen = false;

                    this.apiUpdate = true;

                    this.$forceUpdate();

                }).catch(error=>{

                    console.log(error);

                })

            } ).catch(error=>{

                console.log(error);

            })

        } ,

        // schema section start



        // sidebar start

        openDocSidebar(path_id,doc_id){

            this.docSidebar = true;

            var findPath = this.document.paths.find(val => val._id == path_id);

            var findDoc = findPath.docs.find(val => val._id == doc_id);

            this.docSingle = findDoc;

            setTimeout(()=>{
                var docSidebar = document.getElementById('doc-sidebar');
                docSidebar.style.right = "0px";
                docSidebar.style.transition = "all 0.3s";
            },50)


        } ,


        closeDocSidebar(){

            var docSidebar = document.getElementById('doc-sidebar');
            docSidebar.style.right = "-510px";
            docSidebar.style.transition = "all 0.3s";

            setTimeout(()=>{

                this.docSidebar = false;

            },310)

        } ,


        openSchemaSidebar(schema_id){

            this.schemaSidebar = true;

            var findSchema = this.document.schemes.find(val => val._id == schema_id);

            this.schemaSingle = findSchema;

            console.log(this.schemaSingle);


            setTimeout(()=>{
                var docSidebar = document.getElementById('schema-sidebar');
                docSidebar.style.right = "0px";
                docSidebar.style.transition = "all 0.3s";
            },50)


        } ,


        closeSchemaSidebar(){

            var docSidebar = document.getElementById('schema-sidebar');
            docSidebar.style.right = "-510px";
            docSidebar.style.transition = "all 0.3s";

            setTimeout(()=>{

                this.schemaSidebar = false;

            },310)

        } ,

        // sidebar end



        // other methods start

        schemaRandomColor(){

            var colorRandom = [
                "schema-section-item-background-one" ,
                "schema-section-item-background-two" ,
                "schema-section-item-background-three" , 
                "schema-section-item-background-four" ,
                "schema-section-item-background-five" ,
                "schema-section-item-background-six" ,
            ];

            return colorRandom[Math.round(Math.random()*colorRandom.length-1)];
        } , 


        createPassword(){

                return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>

                    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)

                ) 
        } ,


        borderColorMethodType(method){


            if( method.toLowerCase() == "get" ){

                return "border-color-get-method";

            } else if ( method.toLowerCase() == "post" ) {

                return "border-color-post-method";

            } else if ( method.toLowerCase() == "put" ){

                return "border-color-put-method";

            } else if ( method.toLowerCase() == "patch" ){

                return "border-color-patch-method";

            } else if ( method.toLowerCase() == "delete" ){

                return "border-color-delete-method";

            } else {

                return "border-color-other-method";

            }

        } ,


        backgroundColorMethodType(method){

            if( method.toLowerCase() == "get" ){

                return "background-get-method";


            } else if ( method.toLowerCase() == "post" ) {

                return "background-post-method";


            } else if ( method.toLowerCase() == "put" ){

                return "background-put-method";


            } else if ( method.toLowerCase() == "patch" ){

                return "background-patch-method";

            } else if ( method.toLowerCase() == "delete" ){

                return "background-delete-method";


            } else {

                return "background-other-method";

            }

        } ,


        ColorMethodSidebar(method){


            if( method.toLowerCase() == "get" ){

                return "color-get-method";

            } else if ( method.toLowerCase() == "post" ) {

                return "color-post-method";

            } else if ( method.toLowerCase() == "put" ){

                return "color-put-method";

            } else if ( method.toLowerCase() == "patch" ){

                return "color-patch-method";

            } else if ( method.toLowerCase() == "delete" ){

                return "color-delete-method";

            } else {

                return "color-other-method";

            }

        } ,


        BackgroundColorMethodSidebar(method){


            if( method.toLowerCase() == "get" ){

                return "background-get-method";

            } else if ( method.toLowerCase() == "post" ) {

                return "background-post-method";

            } else if ( method.toLowerCase() == "put" ){

                return "background-put-method";

            } else if ( method.toLowerCase() == "patch" ){

                return "background-patch-method";

            } else if ( method.toLowerCase() == "delete" ){

                return "background-delete-method";

            } else {

                return "background-other-method";

            }

        } ,


        JsonDisign(jsonData){

            var jsonText = Array.from(jsonData.trim());

            var outputData="";

            jsonText.filter((val)=>{

                if(val == "[" || val == "]"){

                    outputData += `<span class='array-setting'>${val}</span>`

                } else if (val == "{" || val == "}" ){
                    
                    outputData += `<span class='object-setting'>${val}</span>`

                } else if (val == "↵" || val.match(/\n/)){


                    outputData += '<br/>';

                } else if (val == " "){

                    outputData += '&nbsp';

                } else if (val == '"' || val == "'"){

                    outputData += `<span class='quotation-setting'>${val}</span>`;

                } else if (val == ":"){

                    outputData += `<span class='colon-setting'>${val}</span>`;

                } else if (val.match(/[0-9]/) != null){

                    outputData += `<span class='number-setting'>${val}</span>`;

                } else if (val == ","){

                    outputData += `<span class='comma-setting'>${val}</span>`;

                }  else{

                    outputData += `<span class='letter-setting'>${val}</span>`;

                }

            })

            return outputData;

        }


        // other methods end


    } ,

    created(){

        if( HasToken() == false ){

            this.$router.push('/login');

        } else {
            
            window.addEventListener('scroll',()=>{

                document.querySelector('.hoverable-path-paper').style.display = "none";

                document.querySelector('.hoverable-schema-paper').style.display = "none";

            })

            window.addEventListener('click',()=>{

                document.querySelector('.hoverable-path-paper').style.display = "none";

                document.querySelector('.hoverable-schema-paper').style.display = "none";

            })

            window.addEventListener('resize',()=>{

                document.querySelector('.hoverable-path-paper').style.display = "none";

                document.querySelector('.hoverable-schema-paper').style.display = "none";

            })

            fetch(`http://localhost:8000/documentation/fetch-single/${this.$route.params.id}`,{

                mode : "cors" ,

                method : "GET" , 

                headers : {

                    "Content-Type":"application/json" , 

                    "Authorization": FetchToken()

                } , 

            }).then( fetchSingleDocumentResponse => {

                fetchSingleDocumentResponse.json().then( jsonResponse => {

                    this.document = jsonResponse ;

                    console.log(this.document);

                } ).catch( error => {

                    console.log(error);

                } )

            } ).catch( error => {

                console.log(error);

            } )

        }


    } ,

    updated(){

        if( this.apiUpdate == true ){

            fetch(`http://localhost:8000/documentation/fetch-single/${this.$route.params.id}`,{

                    mode : "cors" ,

                    method : "GET" , 

                    headers : {

                        "Content-Type":"application/json" , 

                        "Authorization": FetchToken()

                    } , 

                }).then( fetchSingleDocumentResponse => {

                    fetchSingleDocumentResponse.json().then( jsonResponse => {

                        this.document = jsonResponse ;

                        this.apiUpdate = false ;

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