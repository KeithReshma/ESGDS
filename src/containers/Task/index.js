/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react';
import { CloseCircleFilled, UserOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import Select, { components } from 'react-select';
import { Modal, Tooltip, message } from 'antd';
import { Link } from 'react-router-dom';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { faUserPlus, faUserTimes, faCommentAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CustomTable from '../../components/CustomTable';
import Header from '../../components/Header';
import SideMenuBar from '../../components/SideMenuBar';
import { TASK_API_DATA } from '../../constants/PendingTasksConstants';
import AddNewBoardMember from './AddNewBoardMember';
import AddNewKMPMember from './AddNewKMPMember';
import Overlay from '../../components/Overlay';
import { history } from '../../routes';


const FieldWrapper = (props) => {
  if (props.visible) {
    return (
      <Col lg={6}>
        <Form.Group as={Row} >
          <Form.Label column sm={5}>
            {props.label}
          </Form.Label>
          <Col sm={7}>
            {props.body}
          </Col>
        </Form.Group>
      </Col>
    );
  }
  return null;
};

const TaskTable = (props) => {
  console.log(props); // REQ
  const tablePopulate = ({ taskDetails, dpCodesData }) => dpCodesData.map((x) => ({
    key: `${x.dpCodeId}${x.memberName}${x.dpCode}${x.fiscalYear}`,
    dpCode: x.dpCode,
    fiscalYear: x.fiscalYear,
    status: x.status,
    action:
  <Link
    to={{
      pathname: `/dpcode/${x.dpCode}`,
      state: { taskDetails, dpCodeDetails: x },
    }}
  >Enter Data
  </Link>,
  }));

  const TASK_DATA = {
    rowsData: tablePopulate(props),
    columnsHeadData: [
      {
        id: 'dpCode', label: 'DP Code', align: 'left', dataType: 'string',
      },
      {
        id: 'fiscalYear', label: 'Fiscal Year', align: 'left', dataType: 'string',
      },
      {
        id: 'status', label: 'Status', align: 'center', dataType: 'string',
      },
      {
        id: 'action', label: 'Action', align: 'right', dataType: 'element',
      },
    ],
    tableLabel: 'Pending DpCodes',
  };

  return (
    <CustomTable tableData={TASK_DATA} isLoading={props.isLoading} defaultNoOfRows={5} message={props.message} icon={props.icon} />
  );
};

const ControversyTaskTable = (props) => {
  const tablePopulate = ({ taskDetails, dpCodesData }) => dpCodesData.map((x) => ({
    dpCode: x.dpCode,
    keyIssue: x.keyIssue || x.keyIssueName,
    action:
  <Link
    to={{
      pathname: `/controversydpcode/${x.dpCode}`,
      state: { taskDetails, dpCodeDetails: x },
    }}
  >Enter Data
  </Link>,
  }));

  const CONTROVERSY_TASK_DATA = {
    rowsData: tablePopulate(props),
    columnsHeadData: [
      {
        id: 'dpCode', label: 'DP Code', align: 'left', dataType: 'string',
      },
      {
        id: 'keyIssue', label: 'Key Issue', align: 'left', dataType: 'string',
      },
      {
        id: 'action', label: 'Action', align: 'right', dataType: 'element',
      },
    ],
    tableLabel: 'Dp Codes',
  };

  return (
    <CustomTable tableData={CONTROVERSY_TASK_DATA} isLoading={props.isLoading} icon={props.icon} message={props.message} />
  );
};

const ValidationTable = (props) => {
  const [desModal, setDesModal] = useState(false);
  const tablePopulate = ({ taskDetails, dpCodesData }) => dpCodesData.map((x) => ({
    dpCode: x.dpCode,
    fiscalYear: x.fiscalYear,
    description:
  <div>Validation Failed Descript...
    <Tooltip
      placement="top"
      color="#fff"
      title={
        <div style={{ padding: '10px', color: 'black' }}>
          <div>Validation Failed Description 1</div>
          <div>Validation Failed Description 2</div>
          <div>Validation Failed Description 3</div>
        </div>
      }
    ><span style={{ cursor: 'pointer' }}>View more</span>
    </Tooltip>
  </div>,
    validationstatus: <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}><div style={{ color: '#dc3545' }}>Failed</div><div title="Add Comments" onClick={() => { setDesModal(true); }} style={{ cursor: 'pointer', color: 'dodgerblue' }}><FontAwesomeIcon icon={faCommentAlt} /></div></div>,
    action:
  <Link
    to={{
      pathname: `/dpcode/${x.dpCode}`,
      state: { taskDetails, dpCodeDetails: x },
    }}
  >Enter Data
  </Link>,
  }));

  const VALIDATION_DATA = {
    rowsData: tablePopulate(props),
    columnsHeadData: [
      {
        id: 'dpCode', label: 'DP Code', align: 'left', dataType: 'string',
      },
      {
        id: 'fiscalYear', label: 'Fiscal Year', align: 'left', dataType: 'string',
      },
      {
        id: 'description', label: 'Description', align: 'center', dataType: 'element',
      },
      {
        id: 'validationstatus', label: 'Status', align: 'center', dataType: 'element',
      },
      {
        id: 'action', label: 'Action', align: 'right', dataType: 'element',
      },
    ],
    tableLabel: 'Validation Status',
  };

  return (
    <React.Fragment>
      <CustomTable tableData={VALIDATION_DATA} defaultNoOfRows={5} />
      <Overlay
        className="desModal"
        show={desModal}
        onHide={() => setDesModal(false)}
        backdrop="static"
        keyboard={false}
        animation
        centered
        size="lg"
        title="Add comments"
        body={
          <React.Fragment>
            <Form.Control
              as="textarea"
              disabled={false}
              aria-label="With textarea"
              placeholder="Comments"
              onChange={null}
            />
          </React.Fragment>
        }
        onSubmitPrimary={null}
        footer={<div style={{ display: 'flex', justifyContent: 'center' }}><Button variant="success">Sumbit</Button></div>}
      />
    </React.Fragment>
  );
};

const Task = (props) => {
  // DECLARING DISPATCH
  const dispatch = useDispatch();

  // USESELECTOR TO GET reqTASK From Store
  const reqTASK = (useSelector((state) => state.task));
  const taskSubmitFromStore = useSelector((state) => state.taskSubmit);

  const [statusAlert, setStatusAlert] = useState(false);

  // CURRENT ROLE
  const currentRole = sessionStorage.role;

  // CURRENT TAB
  const currentTab = sessionStorage.tab;

  // GET REQ ROLE BASED BOOLEANS
  const [isAnalyst_DC, isAnalyst_DCR, isAnalyst_CC, isQA_DV, isCompanyRep_DR, isClientRep_DR] = [
    currentRole === 'Analyst' && currentTab === 'Data Collection',
    currentRole === 'Analyst' && currentTab === 'Data Correction',
    currentRole === 'Analyst' && currentTab === 'Controversy Collection',
    currentRole === 'QA',
    currentRole === 'Company Representative' || currentRole === 'CompanyRep',
    currentRole === 'Client Representative' || currentRole === 'ClientRep',
  ];

  // TEMP VALIDATION VARIABLE
  const { isValidationCalled } = props.location.state;

  const [isPercentileCalculated, setIsPercentileCalculated] = useState(false);

  const sideBarRef = useRef();

  const getReqAPIData = () => {
    if (isClientRep_DR) { return TASK_API_DATA.COMPANY_REP_DR; }
    if (isCompanyRep_DR) { return TASK_API_DATA.COMPANY_REP_DR; }
    if (isQA_DV) { return TASK_API_DATA.QA_DV; }
    if (isAnalyst_DC) { return TASK_API_DATA.ANALYST_DC; }
    if (isAnalyst_DCR) { return TASK_API_DATA.ANALYST_DCR; }
    if (isAnalyst_CC) { return TASK_API_DATA.ANALYST_CC; }
    return [];
  };
  const [dpCodeType, setDpCodeType] = useState('Standalone');

  // VALUES FROM PENDING TASKS PAGE THROUGH PROPS.LOCATION.STATE
  const taskDetails = { ...props.location.state.taskDetails, memberType: dpCodeType, isValidationCalled };

  const extractReqTask = (data) => {
    let returnableTask;
    if (isClientRep_DR || isCompanyRep_DR) {
      [returnableTask] = data.filter((e) => (e.taskId === taskDetails.taskId));
    }
    if (isAnalyst_DC || isQA_DV || isAnalyst_DCR) {
      [returnableTask] = (reqTASK && reqTASK.task) ? [reqTASK.task] : data.filter((e) => (e.taskId === taskDetails.taskId));
    }
    if (isAnalyst_CC) {
      // KEY NAMES CHANGES REQ FROM SHIVA !
      [returnableTask] = (reqTASK && reqTASK.task && reqTASK.task.data) ? [{ controversy: { ...reqTASK.task.data, dpCodesData: reqTASK.task.data.dpCodesList } }] : data.filter((e) => (e.taskId === taskDetails.taskId));
    }
    return { ...returnableTask, ...taskDetails };
  };

  const reqTaskData = extractReqTask(getReqAPIData());
  const [reqKeyIssue, setReqKeyIssue] = useState('');
  const [reqBoardMember, setReqBoardMember] = useState(null);
  const [reqKmpMember, setReqKmpMember] = useState(null);

  const [isAddNewBoardVisible, setIsAddNewBoardVisible] = useState(false);
  const [isAddNewKMPVisible, setIsAddNewKMPVisible] = useState(false);
  const [isTerminateBoardVisible, setIsTerminateBoardVisible] = useState(false);
  const [isTerminateKmpVisible, setIsTerminateKmpVisible] = useState(false);

  const tabs = ['Standalone', 'Board Matrix', 'Kmp Matrix'];

  const tabsRef = useRef(tabs.map(() => React.createRef()));

  const defaultActiveTab = () => {
    const defaultTab = tabsRef.current[0].current;
    if (defaultTab) {
      defaultTab.classList.add('active');
    }
  };

  useEffect(() => {
    defaultActiveTab();
    setDpCodeType('Standalone');
  }, []);

  useEffect(() => {
    if (!isAnalyst_CC) {
      dispatch({ type: 'TASK_GET_REQUEST', taskId: taskDetails.taskId });
    }
    if (isAnalyst_CC) {
      dispatch({ type: 'CONTROVERSY_TASK_GET_REQUEST', taskId: taskDetails.taskId });
    }
  }, []);

  useEffect(() => {
    setReqKeyIssue('');
  }, [dpCodeType]);

  useEffect(() => {
    if (taskSubmitFromStore.task && taskSubmitFromStore.task && statusAlert) {
      message.success(taskSubmitFromStore.task.message);
      history.push('/pendingtasks');
      setStatusAlert(false);
    }

    if (taskSubmitFromStore.error && statusAlert) {
      message.error(taskSubmitFromStore.error.message);
      setStatusAlert(false);
    }
  });


  const getReqDpCodesList = () => {
    if (isAnalyst_DC || isAnalyst_DCR || isQA_DV || isCompanyRep_DR || isClientRep_DR) {
      if (dpCodeType === 'Standalone') {
        if (reqKeyIssue) {
          return reqTaskList.dpCodesData.filter((e) => (e.keyIssueId && e.keyIssueId === reqKeyIssue.value));
        }
        return reqTaskList.dpCodesData;
      }
      if (dpCodeType === 'Board Matrix') {
        if (reqBoardMember && reqKeyIssue) {
          return reqTaskList.dpCodesData.filter((e) => (e.memberId && e.memberId === reqBoardMember.value && (e.keyIssueId && e.keyIssueId === reqKeyIssue.value)));
        }
        if (reqBoardMember && !reqKeyIssue) {
          return reqTaskList.dpCodesData.filter((e) => (e.memberId && e.memberId === reqBoardMember.value));
        }
        return [];
      }
      if (dpCodeType === 'Kmp Matrix') {
        if (reqKmpMember && reqKeyIssue) {
          return reqTaskList.dpCodesData.filter((e) => (e.memberId && e.memberId === reqKmpMember.value && (e.keyIssueId && e.keyIssueId === reqKeyIssue.value)));
        }
        if (reqKmpMember && !reqKeyIssue) {
          return reqTaskList.dpCodesData.filter((e) => (e.memberId && e.memberId === reqKmpMember.value));
        }
        return [];
      }
    }
    if (isAnalyst_CC) {
      return reqTaskList.dpCodesData;
    }
    return [];
  };

  const getReqTaskList = () => {
    if (isAnalyst_DC || isAnalyst_DCR || isQA_DV || isCompanyRep_DR || isClientRep_DR) {
      if (dpCodeType === 'Standalone' && reqTaskData.standalone) {
        return reqTaskData.standalone;
      }
      if (dpCodeType === 'Board Matrix' && reqTaskData.boardMatrix) {
        return reqTaskData.boardMatrix;
      }
      if (dpCodeType === 'Kmp Matrix' && reqTaskData.kmpMatrix) {
        return reqTaskData.kmpMatrix;
      }
    }
    if (isAnalyst_CC && reqTaskData.controversy) {
      return reqTaskData.controversy;
    }
    return { dpCodesData: [] };
  };

  const reqTaskList = getReqTaskList();
  const reqKeyIssuesList = dpCodeType === 'Standalone' && reqTaskData.keyIssuesList ? reqTaskData.keyIssuesList : [];
  const boardMembersList = dpCodeType === 'Board Matrix' && reqTaskData.boardMatrix ? (reqTaskData.boardMatrix.boardMemberList) : [];
  const kmpMembersList = dpCodeType === 'Kmp Matrix' && reqTaskData.kmpMatrix ? (reqTaskData.kmpMatrix.kmpMemberList) : [];
  const reqDpCodesData = getReqDpCodesList();

  const taskToNextPage = {
    taskId: reqTaskData.taskId,
    pillar: reqTaskData.pillar,
    company: reqTaskData.company,
    companyId: reqTaskData.companyId,
    taskNumber: reqTaskData.taskNumber,
    memberType: reqTaskData.memberType,
    dpCodesData: reqDpCodesData,
  };

  sessionStorage.filteredData = isAnalyst_CC ? JSON.stringify(reqDpCodesData) : JSON.stringify(taskToNextPage);

  const onClickTabChanger = (event) => {
    tabsRef.current.forEach((element) => {
      const btn = element.current;
      btn.classList.remove('active');
    });
    const { currentTarget } = event;
    currentTarget.classList.add('active');
    if (currentTarget.innerHTML) {
      setDpCodeType(currentTarget.innerHTML);
    }
  };

  const onChangeKeyIssue = (event) => {
    setReqKeyIssue(event);
  };

  const onChangeReqBoardMember = (event) => {
    if (event) {
      const boardMemberName = event.value;
      setReqBoardMember(boardMembersList.filter((boardMember) => (boardMember.value === boardMemberName))[0]);
    } else {
      setReqBoardMember(null);
    }
  };

  const onChangeReqKmpMember = (event) => {
    if (event) {
      const kmpMemberName = event.value;
      setReqKmpMember(kmpMembersList.filter((kmpMember) => (kmpMember.value === kmpMemberName))[0]);
    } else {
      setReqKmpMember(null);
    }
  };

  const onSubmitTask = () => {
    let postableData = {
      companyId: taskDetails.companyId,
      year: taskDetails.fiscalYear,
      clientTaxonomyId: taskDetails.clientTaxonomyId,
      taskStatus: '',
      taskId: taskDetails.taskId,
    };
    if (isAnalyst_DC) {
      postableData = { ...postableData, taskStatus: 'Collection Completed' };
    }
    if (isAnalyst_DCR) {
      postableData = { ...postableData, taskStatus: 'Collection Completed' };
    }
    if (isQA_DV) {
      postableData = { ...postableData, taskStatus: 'Verification Completed' };
    }
    if (isClientRep_DR) {
      postableData = { ...postableData, taskStatus: '' };
    }
    if (isCompanyRep_DR) {
      postableData = { ...postableData, taskStatus: '' };
    }

    dispatch({ type: 'TASK_SUBMIT_POST_REQUEST', payload: postableData });
    setStatusAlert(true);
  };

  const onSubmitTask2 = () => {
    let postableData = {
      companyId: taskDetails.companyId,
      year: taskDetails.fiscalYear,
      clientTaxonomyId: taskDetails.clientTaxonomyId,
      taskStatus: '',
      taskId: taskDetails.taskId,
    };
    if (isQA_DV) {
      postableData = { ...postableData, taskStatus: 'Correction Pending' };
    }
    dispatch({ type: 'TASK_SUBMIT_POST_REQUEST', payload: postableData });
    setStatusAlert(true);
  };

  const onClickCalculateDerivedData = () => {
    setIsPercentileCalculated(true);
    message.success('Calculation Finished !');
  };

  const onClickValidate = () => {
    history.push({
      pathName: `/task/${props.location.state.taskId}`,
      state: {
        taskId: props.location.state.taskId,
        taskDetails,
        isValidationCalled: true,
      },
    });
  };

  const onClickBack = () => {
    setIsPercentileCalculated(false);
    history.push({
      pathName: `/task/${props.location.state.taskId}`,
      state: {
        taskId: props.location.state.taskId,
        taskDetails,
      },
    });
  };

  const KMPMenuList = (e) => (
    <components.MenuList {...e}>
      <div>
        <Button style={{ width: '50%' }} variant="light" title="Add New Member" onClick={() => setIsAddNewKMPVisible(true)}><FontAwesomeIcon color="dodgerblue" icon={faUserPlus} /></Button>
        <Button style={{ width: '50%' }} variant="light" title="Terminate Member" onClick={() => setIsTerminateKmpVisible(true)}><FontAwesomeIcon color="red" icon={faUserTimes} /></Button>
      </div>
      {e.children}
    </components.MenuList>
  );

  const BoardMemMenuList = (e) => (
    <components.MenuList {...e}>
      <div>
        <Button style={{ width: '50%' }} variant="light" title="Add New Member" onClick={() => setIsAddNewBoardVisible(true)}><FontAwesomeIcon color="dodgerblue" icon={faUserPlus} /></Button>
        <Button style={{ width: '50%' }} variant="light" title="Terminate Member" onClick={() => setIsTerminateBoardVisible(true)}><FontAwesomeIcon color="red" icon={faUserTimes} /></Button>
      </div>
      {e.children}
    </components.MenuList>
  );

  return (
    <div className="main">
      <SideMenuBar ref={sideBarRef} />
      <div className="rightsidepane">
        <Header title="Task" sideBarRef={sideBarRef} />
        <div className="container-main" >
          <div className="task-info-group">
            <div className="task-id-year-wrap">
              {!isAnalyst_CC && <div className="task-pillar">{`${reqTaskData.company} / ${reqTaskData.pillar}`}</div>}
              {isAnalyst_CC && <div className="task-pillar">{reqTaskData.company}</div>}
              <div className="task-id">{`Task No: ${reqTaskData.taskNumber}`}</div>
            </div>
            {(reqTaskData.pillar === 'Governance' || reqTaskData.pillar === 'Corporate Governance') &&
            <div className="task-tabs-wrap">
              {tabs.map((tab, index) => (<div ref={tabsRef.current[index]} id={tab} key={tab[index]} onClick={onClickTabChanger} className="task-tabs">{tab}</div>))}
            </div>}
            <div className="task-keyissue">
              <Row>
                {/* ONLY FOR STANDALONE */}
                {(isAnalyst_DC || isAnalyst_DCR || isQA_DV || isCompanyRep_DR || isClientRep_DR) && dpCodeType === 'Standalone' &&
                <FieldWrapper
                  label="Key Issues*"
                  visible
                  body={
                    <Select
                      name="userRole"
                      onChange={onChangeKeyIssue}
                      options={reqKeyIssuesList}
                      value={reqKeyIssue}
                      isSearchable
                      isClearable
                      maxLength={30}
                    />}
                />}

                {/* ONLY FOR GOVERNANCE > MATRIX */}
                { (reqTaskData.pillar === 'Governance' || reqTaskData.pillar === 'Corporate Governance') && dpCodeType === 'Board Matrix' &&
                <FieldWrapper
                  label="Board Members*"
                  visible
                  body={
                    <Select
                      name="userRole"
                      onChange={onChangeReqBoardMember}
                      options={boardMembersList.map((boardMember) => ({ label: boardMember.label, value: boardMember.value }))}
                      value={reqBoardMember && { label: reqBoardMember.label, value: reqBoardMember.value }}
                      isSearchable
                      isClearable
                      maxLength={30}
                      components={{ MenuList: BoardMemMenuList }}
                    />}
                />}
                {/* ONLY FOR GOVERNANCE > MATRIX */}
                { (reqTaskData.pillar === 'Governance' || reqTaskData.pillar === 'Corporate Governance') && dpCodeType === 'Kmp Matrix' &&
                <FieldWrapper
                  label="KMP*"
                  visible
                  body={
                    <Select
                      name="userRole"
                      onChange={onChangeReqKmpMember}
                      options={kmpMembersList.map((KMPMember) => ({ label: KMPMember.label, value: KMPMember.value }))}
                      value={reqKmpMember && { label: reqKmpMember.label, value: reqKmpMember.value }}
                      isSearchable
                      isClearable
                      maxLength={30}
                      components={{ MenuList: KMPMenuList }}
                    />}
                />}
              </Row>
            </div>
            {(isAnalyst_DC || isAnalyst_DCR || isQA_DV || isCompanyRep_DR || isClientRep_DR) && !isValidationCalled && <TaskTable
              taskDetails={taskDetails}
              dpCodesData={reqDpCodesData}
              isLoading={(isAddNewBoardVisible || isAddNewKMPVisible || isTerminateBoardVisible || isTerminateKmpVisible) ? false : reqTASK.isLoading || taskSubmitFromStore.isLoading}
              message={(reqTASK.error) ? (reqTASK.error.message || 'Something went wrong !') : (dpCodeType === 'Board Matrix' || dpCodeType === 'Kmp Matrix') && (reqDpCodesData.length === 0) ? 'Please select member!' : null}
              icon={(reqTASK && reqTASK.error) ? <CloseCircleFilled /> : (dpCodeType === 'Board Matrix' || dpCodeType === 'Kmp Matrix') && (reqDpCodesData.length === 0) ? <UserOutlined /> : null}
            />}
            {isAnalyst_CC && <ControversyTaskTable
              taskDetails={taskDetails}
              dpCodesData={reqDpCodesData}
              isLoading={reqTASK.isLoading}
              message={(reqTASK.error) ? (reqTASK.error.message || 'Something went wrong !') : null}
              icon={(reqTASK && reqTASK.error) ? <CloseCircleFilled /> : null}
            />}

            {(isAnalyst_DC || isAnalyst_DCR) && isValidationCalled && <ValidationTable taskDetails={taskDetails} dpCodesData={reqDpCodesData} />}

            <Col lg={12} className="datapage-button-wrap" style={{ marginBottom: '3%' }}>
              {/* Button */}
              { (((isAnalyst_DC || isAnalyst_DCR) && isValidationCalled) || isQA_DV || isCompanyRep_DR || isClientRep_DR) &&
              <Button className="datapage-button" variant="success" onClick={onSubmitTask}>Submit</Button>}

              { isQA_DV &&
              <Button className="datapage-button" variant="info" onClick={onSubmitTask2}>ReAssign</Button>}

              { (isAnalyst_DC || isAnalyst_DCR) && !isValidationCalled &&
              <Button className="datapage-button" variant="success" onClick={onClickCalculateDerivedData} >Calculate Derived Data</Button>}

              { (isAnalyst_DC || isAnalyst_DCR) && isPercentileCalculated && !isValidationCalled &&
              <Button className="datapage-button" variant="info" onClick={onClickValidate}>Validate</Button>}
              { (isAnalyst_DC || isAnalyst_DCR) && isValidationCalled &&
              <Button className="datapage-button" variant="danger" onClick={onClickBack}>Back</Button>}

            </Col>

            {/* Button */}
            {/* <Col lg={12} className="datapage-button-wrap" style={{ marginBottom: '3%' }}>
              { true &&
              <Button className="datapage-button" variant="success" onClick={null}>Submit</Button>}
            </Col> */}

            {isAddNewBoardVisible &&
            <Modal title="Add New Board Member" className="task-modal" maskClosable={false} width="80%" visible={isAddNewBoardVisible} footer={null} onCancel={() => setIsAddNewBoardVisible(false)}>
              {isAddNewBoardVisible && false && <AddNewBoardMember reqYears={reqTaskData.fiscalYear} reqMemberType="boardMatrix" onCloseAddNewMemberModal={() => setIsAddNewBoardVisible(false)} />}
              {isAddNewBoardVisible && <AddNewKMPMember modalType="AddNewBoardType" taskDetails={taskDetails} closeModal={() => setIsAddNewBoardVisible(false)} />}
            </Modal>}

            {isAddNewKMPVisible &&
            <Modal title="Add New Kmp Member" className="task-modal" maskClosable={false} width="80%" visible={isAddNewKMPVisible} footer={null} onCancel={() => setIsAddNewKMPVisible(false)}>
              {isAddNewKMPVisible && <AddNewKMPMember modalType="AddNewKmpType" taskDetails={taskDetails} closeModal={() => setIsAddNewKMPVisible(false)} />}
              {/* {isAddNewKMPVisible && <AddNewBoardMember reqYears={reqTaskData.fiscalYear} reqMemberType="kmpMatrix" onCloseAddNewMemberModal={() => setIsAddNewKMPVisible(false)} />} */}
            </Modal>}

            {isTerminateBoardVisible &&
            <Modal title="Terminate Board Member" className="task-modal" maskClosable={false} width="80%" style={{ maxWidth: '700px' }} visible={isTerminateBoardVisible} footer={null} onCancel={() => setIsTerminateBoardVisible(false)}>
              {isTerminateBoardVisible && <AddNewKMPMember modalType="TerminateBoardType" taskDetails={taskDetails} closeModal={() => setIsTerminateBoardVisible(false)} />}
            </Modal>}

            {isTerminateKmpVisible &&
            <Modal title="Terminate Kmp Member" className="task-modal" maskClosable={false} width="80%" style={{ maxWidth: '700px' }} visible={isTerminateKmpVisible} footer={null} onCancel={() => setIsTerminateKmpVisible(false)}>
              {isTerminateKmpVisible && <AddNewKMPMember modalType="TerminateKmpType" taskDetails={taskDetails} closeModal={() => setIsTerminateKmpVisible(false)} />}
            </Modal>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;
