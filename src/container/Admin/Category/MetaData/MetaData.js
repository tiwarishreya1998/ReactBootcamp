import React from'react';
import Button from '../../../../component/UI/Button/Button';
const MetaData =props=>{

const addMetadata=()=>{
    props.history.push('/addMetadata')
}
const viewMetadata=()=>{
    props.history.push('/viewMetadata')
}
const addMetadataValues=()=>{
    props.history.push('/addMetadataValues')
}

    return(
        <div className="container fluid" style={{marginTop: "10%",marginBottom:"5%",width:"50%"}}>
            <div className="container-fluid">
                <div className="card" style={{marginTop:"2%",boxShadow: "1px 2px 2px grey"}}>
                    <div>
                        <Button btnType="Success" clicked={addMetadata}>Add Metadata field</Button></div>
                        <div>
                        <Button btnType="Success" clicked={viewMetadata}>View Metadata field</Button></div>
                        <div>
                        <Button btnType="Success" clicked={addMetadataValues}>Add and Update Metadata values</Button>
                    </div>
                </div>
            </div>
                         
        </div>
    );
}
export default MetaData;