import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { sessionUpdateAction } from "../actions/sessionActions";
import { useParams } from "react-router-dom";
import FileBase64 from "react-file-base64";
import { sessionDetailAction } from "../actions/sessionActions";
import { useContext } from "react";
import { SocketContext } from "../Context";

function Dropzone() {
  const dispatch = useDispatch();

  const { studentId, teacherId } = useContext(SocketContext);

  const params = useParams();
  // console.log(params, "use params");
  const [selectedFile, setSelectedFile] = useState(null);

  const sessionDetail = useSelector((state) => state.sessionDetail);

  const { loading, success, session } = sessionDetail;

  console.log("sessionDetail", sessionDetail);

  // useEffect(() => {
  //   if (loading  && selectedFile) {

  //   }
  // }, [dispatch, loading, params.id, selectedFile, success]);

  // let buff = new Buffer(str, "base64");
  // let base64ToStringNew = buff.toString("ascii");

  // const fileSelectedHandler = (event) => {
  //   console.log(event.target.files[0])
  //   setSelectedFile(event.target.files[0]);
  // };

  const fileUploadHandler = () => {
    // const fd = new FormData();

    // fd.append("image", selectedFile, selectedFile.name);
    // console.log(selectedFile, "selected File")
    dispatch(sessionUpdateAction({ image: selectedFile }, params.id));

    console.log("student & teacher", { teacherId, studentId });

    dispatch(sessionDetailAction(teacherId, studentId));
  };

  return (
    <div>
      {/* <input type='file'  /> */}
      <FileBase64
     
        multiple={false}
        onDone={({ base64 }) => setSelectedFile(base64)}></FileBase64>

      <Button onClick={() => fileUploadHandler()}>Upload</Button>

      {/* render(){
    {this.state.image ? <img src={`data:image/png;base64,${this.state.image}`}/>: ''}
} */}

      {session?.[0]?.image && (
        <img
          style={{ width: "100%", height: "100%" }}
          src={session?.[0]?.image}
          alt={"null"}
        />
      )}
    </div>
  );
}

export default Dropzone;
