import React, { useEffect, useContext } from "react";
// import { queryDetail } from '../reducers/queryReducers'
import VideoPlayer from "../component/VideoPlayer";
import { getQueryDetails } from "../actions/queryActions";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Options from "../component/Options";
import Notifications from "../component/Notifications";
import { SocketContext } from "../Context";

function QueryDetailsPage() {
  let params = useParams();
  let queryId = params.id;
  const dispatch = useDispatch();

  const queryDetails = useSelector((state) => state.queryDetail);
  const { loading, query, error } = queryDetails;

  useEffect(() => {}, [dispatch, queryId]);

  return (
    <div>
      <VideoPlayer />
      <Notifications />
    </div>
  );
}

export default QueryDetailsPage;
