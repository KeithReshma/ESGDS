/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { DatePicker, Image, Upload, Button as AntButton, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Select from 'react-select';
import moment from 'moment';
import 'antd/dist/antd.css';
import { history } from '../../routes';

const QADataSheet = ({
  maxIndex, minIndex, currentIndex, currentDpCode, currentTask, location, historyDpCodeData, openDrawer,
}) => {
  const isFieldDisabled = true;

  // # historicalData # A Variable Is Just A List Of Historical Data Of currentDpCode
  const historicalData = currentDpCode.historyDpData;

  const defaultHistoricalData = historicalData[0];
  const errorList = ['T1. Incorrect data input/typo', 'T1. Document missed',
    'T1. Data/Information missed',
    'T1. SOP not followed',
    'T1. Incorrect Evidence',
    'T1. Missed snippet',
    'T1. Incorrect Scoring',
    'T2. Evidence not substantive',
    'T2. Improvement for next time',
    'T2. Comments and calculation',
    'T2. Others/No error'];
  // # defaultData # A Variable Is Used For Initializing The formData State Based On The Data That Comes From Props
  const defaultData = (!historyDpCodeData) ?
    {
      dpCode: currentDpCode.dpCode,
      dataType: currentDpCode.dataType,
      year: currentDpCode.fiscalYear,
      pageNo: currentDpCode.pageNo || '',
      url: currentDpCode.url || '',
      publicationDate: currentDpCode.publicationDate || '',
      description: currentDpCode.description,
      textSnippet: currentDpCode.textSnippet || '',
      screen: currentDpCode.screen || '',
      source: currentDpCode.source || '',
      filePath: currentDpCode.filePath || '',
      response: currentDpCode.response || '',
    } :
    {
      dpCode: defaultHistoricalData.dpCode,
      dataType: defaultHistoricalData.dataType,
      year: defaultHistoricalData.fiscalYear,
      pageNo: defaultHistoricalData.pageNo || '',
      url: defaultHistoricalData.url || '',
      publicationDate: defaultHistoricalData.publicationDate || '',
      description: defaultHistoricalData.description,
      textSnippet: defaultHistoricalData.textSnippet || '',
      screen: defaultHistoricalData.screen || '',
      source: defaultHistoricalData.source || '',
      filePath: defaultHistoricalData.filePath || '',
      response: defaultHistoricalData.response || '',
    };
  // # formData # A State Intialized With Set Of Variables As Object/Json
  const [formData, setFormData] = useState(defaultData);

  // Below useEffect Is Defined To Change (Empty Out/Clear Out) The Current formData State With Respect To Location Prop Attribute
  useEffect(() => {
    setFormData(defaultData);
  }, [location]);

  // onChangeFormData Function Gets Called When Every Form Fields Changes And Updates The formData State
  const onChangeFormData = (event) => {
    console.log(event.target && event.target.files, event);
    const key = event.currentTarget.name;
    switch (key) {
      case 'dpCode':
        setFormData({
          ...formData,
        });
        break;
      case 'year':
        setFormData({
          ...formData, year: event.currentTarget.value.value,
        });
        break;
      case 'pageNo':
        setFormData({
          ...formData, pageNo: event.currentTarget.value,
        });
        break;
      case 'publicationDate':
        setFormData({
          ...formData, publicationDate: event.currentTarget.value,
        });
        break;
      case 'url':
        setFormData({
          ...formData, url: event.currentTarget.value,
        });
        break;
      case 'description':
        setFormData({
          ...formData, description: event.currentTarget.value,
        });
        break;
      case 'textSnippet':
        setFormData({
          ...formData, textSnippet: event.currentTarget.value,
        });
        break;
      case 'screen':
        setFormData({
          ...formData, screen: event.currentTarget.value,
        });
        break;
      case 'source':
        setFormData({
          ...formData, source: event.currentTarget.value.value, url: event.currentTarget.value.value.url, publicationDate: event.currentTarget.value.value.publicationDate,
        });
        break;
      case 'uploadScreenshot':
        if (event.currentTarget.value.fileList[0]) {
          setFormData({
            ...formData, filePath: URL.createObjectURL(event.currentTarget.value.fileList[0].originFileObj),
          });
        } else {
          setFormData({
            ...formData, filePath: '',
          });
        }
        break;
      case 'response':
        if (formData.dataType === 'text') {
          setFormData({
            ...formData, response: event.currentTarget.value.value,
          });
        } else if (formData.dataType === 'date') {
          setFormData({
            ...formData, response: event.currentTarget.value,
          });
        } else if (formData.dataType === 'number') {
          setFormData({
            ...formData, response: event.currentTarget.value,
          });
        }
        break;

      default:
        break;
    }
  };
  console.log(formData);
  // saveAndNextClickHandler Function Handle A Click Comes From A Button And Traverse Forth To The Next DpCode Page
  const saveAndNextClickHandler = () => {
    console.log(formData);
    const nextDpCode = currentTask.data[currentIndex + 1];
    history.push(`/pendingtasks/${currentTask.taskId}/${nextDpCode.dpCode}`);
  };

  // saveAndNextClickHandler Function Handle A Click Comes From A Button And Traverse Back To The Previous DpCode Page
  const editAndPreviousClickHandler = () => {
    const nextDpCode = currentTask.data[currentIndex - 1];
    history.push(`/pendingtasks/${currentTask.taskId}/${nextDpCode.dpCode}`);
  };
  const uploadScreenshotCheck = (file) => {
    console.log(file.type);
    if (!(file.type).includes('image')) {
      message.error(`${file.name} is not a image file`);
    }
    // return (file.type).includes('image') ? false : Upload.LIST_IGNORE;
  };
  // inChangeHistoryYear Function Change The fromData Values With Respect To The Selected Year
  const onChangeHistoryYear = (event) => {
    setFormData({
      dpCode: event.value.dpCode,
      dataType: event.value.dataType,
      year: event.value.fiscalYear,
      pageNo: event.value.pageNo,
      url: event.value.url,
      publicationDate: event.value.publicationDate,
      description: event.value.description,
      textSnippet: event.value.textSnippet,
      screen: event.value.screen,
      source: event.value.source,
      filePath: event.value.filePath,
      response: event.value.response,
    });
  };
  const sourceApiData = [
    { sourceName: 'Annual Report_2019-2018', url: 'https://www.hindustanpetroleum.com/documents/doc/HPCL%20Annual%20Report%202019-2020.pdf', publicationDate: moment('Tue May 04 2021') },
  ];
  return (
    <Row>
      {/* ################################################################################################ DPCODE */}
      <Col lg={6}>
        <Form.Group as={Row} >
          <Form.Label column sm={5}>
            Dp Code*
          </Form.Label>
          <Col sm={7}>
            <Form.Control
              name="dpCode"
              type="text"
              readOnly
              value={formData.dpCode}
            />
          </Col>
        </Form.Group>
      </Col>

      { !historyDpCodeData &&
        <Col lg={6}>
          <Form.Group as={Row} >
            <Form.Label column sm={5}>
              Year*
            </Form.Label>
            <Col sm={7}>
              <Select
                name="year"
                isDisabled
                value={{ label: formData.year, value: formData.year }}
                options={[{ label: formData.year, value: formData.year }]}
                maxLength={30}
              />
            </Col>
          </Form.Group>
        </Col> }
      { historyDpCodeData &&
        <Col lg={6}>
          <Form.Group as={Row} >
            <Form.Label column sm={5}>
              History Year*
            </Form.Label>
            <Col sm={7}>
              <Select
                name="year"
                // onChange={(e) => onChangeFormData({ currentTarget: { id: 'year', value: e } })}
                value={{ label: formData.year, value: formData.year }}
                onChange={onChangeHistoryYear}
                options={historicalData.map((dpData) => ({ label: dpData.fiscalYear, value: dpData }))}
                // isSearchable={}
                // className={}
                maxLength={30}
              />
            </Col>
          </Form.Group>
        </Col> }
      {/* ################################################################################################ SOURCE */}
      <Col lg={6}>
        <Form.Group as={Row} >
          <Form.Label column sm={5}>
            Source*
          </Form.Label>
          <Col sm={7}>
            <Select
              name="source"
              isDisabled={isFieldDisabled}
              onChange={(e) => onChangeFormData({ currentTarget: { name: 'source', id: 'source', value: e } })}
              value={formData.source && { label: formData.source.sourceName, value: formData.source }}
              // onChange={}
              options={sourceApiData.map((source) => ({ label: source.sourceName, value: source }))}
              // isSearchable={}
              // className={}
              placeholder="Choose source"
              maxLength={30}
            />
          </Col>
        </Form.Group>
      </Col>
      {!historyDpCodeData &&
      <Col lg={6}>
        <Button onClick={openDrawer} >Add Source</Button>
      </Col> }
      {/* ################################################################################################ LINE */}
      <Col lg={12} className="datapage-horizontalLine"></Col>
      {/* ################################################################################################ DESCRIPTION */}
      <Col lg={8}>
        <Form.Group as={Row} >
          <Form.Label column sm={4}>
            Description*
          </Form.Label>
          <Form.Label column sm={8}>
            {formData.description}
          </Form.Label>
          {/* <Col sm={8}>
            {formData.description}
            <Form.Control type="text" id="description" onChange={onChangeFormData} value={formData.description} placeholder="Description" />
          </Col> */}
        </Form.Group>
      </Col>
      {/* ################################################################################################ Response */}
      <Col lg={4}>
        <Form.Group as={Row} >
          {/* <Form.Label column sm={5}>
            Response*
          </Form.Label> */}
          <Col sm={12}>
            {formData.dataType === 'number' && <Form.Control type="text" name="response" readOnly={isFieldDisabled} onChange={onChangeFormData} value={formData.response} placeholder="Response" />}
            {formData.dataType === 'date' && <DatePicker className="datapage-datepicker" name="response" disabled={isFieldDisabled} onChange={(e) => onChangeFormData({ currentTarget: { name: 'response', id: 'response', value: e } })} value={formData.response && moment(formData.response)} size="large" />}
            {formData.dataType === 'text' &&
            <Select
              name="response"
              isDisabled={isFieldDisabled}
              onChange={(e) => onChangeFormData({ currentTarget: { name: 'response', id: 'response', value: e } })}
              value={formData.response && { label: formData.response, value: formData.response }}
              options={[{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }, { label: 'Na', value: 'Na' }, { label: 'M', value: 'M' }, { label: 'F', value: 'F' }]}
              // isSearchable={}
              // className={}
              maxLength={30}
            />}
          </Col>
        </Form.Group>
      </Col>
      {/* ################################################################################################ TEXT SNIPPET */}
      <Col lg={6}>
        <Form.Group as={Row} >
          <Form.Label column sm={5}>
            TextSnippet*
          </Form.Label>
          <Col sm={7}>
            <Form.Control type="text" name="textSnippet" readOnly={isFieldDisabled} onChange={onChangeFormData} value={formData.textSnippet} placeholder="Snippet" />
          </Col>
        </Form.Group>
      </Col>
      {/* ################################################################################################ PAGE NO */}
      <Col lg={6}>
        <Form.Group as={Row} >
          <Form.Label column sm={5}>
            PageNo*
          </Form.Label>
          <Col sm={7}>
            <Form.Control type="text" name="pageNo" readOnly={isFieldDisabled} onChange={onChangeFormData} value={formData.pageNo} placeholder="Page No" />
          </Col>
        </Form.Group>
      </Col>
      { historyDpCodeData &&
        <React.Fragment>
          {/* ################################################################################################ URL */}
          <Col lg={6}>
            <Form.Group as={Row} >
              <Form.Label column sm={5}>
                Url*
              </Form.Label>
              <Col sm={7}>
                <Form.Control type="text" name="url" readOnly={isFieldDisabled} onChange={onChangeFormData} value={formData.url} placeholder="Url" />
              </Col>
            </Form.Group>
          </Col>
          {/* ################################################################################################ PUBLICATION DATE */}
          <Col lg={6}>
            <Form.Group as={Row} >
              <Form.Label column sm={5}>
                PublicationDate*
              </Form.Label>
              <Col sm={7}>
                <DatePicker className="datapage-datepicker" name="publicationDate" disabled={isFieldDisabled} onChange={(e) => onChangeFormData({ currentTarget: { name: 'publicationDate', id: 'publicationDate', value: e } })} value={formData.publicationDate && moment(formData.publicationDate)} size="large" />
              </Col>
            </Form.Group>
          </Col>
        </React.Fragment> }
      {/* ################################################################################################ SCREEN */}
      {/* <Col lg={6}>
        <Form.Group as={Row} >
          <Form.Label column sm={5}>
            Screen*
          </Form.Label>
          <Col sm={7}>
            <Form.Control type="text" id="screen" readOnly={historyDpCodeData} onChange={onChangeFormData} value={formData.screen} placeholder="Screen" />
          </Col>
        </Form.Group>
      </Col> */}
      {/* ################################################################################################ FILE PATH */}
      <Col lg={6}>
        <Form.Group as={Row} >
          <Form.Label column sm={5}>
            Upload Screenshot*
          </Form.Label>
          <Col sm={7}>
            <Upload style={{ width: '100%' }} maxCount={1} beforeUpload={uploadScreenshotCheck} onChange={(e) => { onChangeFormData({ currentTarget: { name: 'uploadScreenshot', value: e } }); }}>
              <AntButton
                disabled={isFieldDisabled}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '38px',
                }}
                icon={<UploadOutlined />}
              >Click to Upload
              </AntButton>
            </Upload>
          </Col>
        </Form.Group>
      </Col>
      <Col lg={6}>
        {/* ################################################################################################ IMAGE PREVIEW */}
        {formData.filePath && <Image width="50%" src={formData.filePath} /> }
      </Col>
      {/* ################################################################################################ LINE */}
      <Col lg={12} className="datapage-horizontalLine"></Col>
      { !historyDpCodeData &&
      <React.Fragment>
        {/* ################################################################################################ ERROR TYPE */}
        <Col lg={6}>
          <Form.Group as={Row} >
            <Form.Label column sm={5}>
              Error Type*
            </Form.Label>
            <Col sm={7}>
              <Select
                name="userRole"
                // value={""}
                styles={{
                  // Fixes the overlapping problem of the component
                  menuPortal: (provided) => ({ ...provided, zIndex: 9999 }),
                  menu: (provided) => ({ ...provided, zIndex: 9999 }),
                }}
                options={errorList.map((e) => ({ label: e, value: e }))}
                // isSearchable={}
                // className={}
                maxLength={30}
              />
            </Col>
          </Form.Group>
        </Col>
        {/* ################################################################################################ COMMENTS */}
        <Col lg={6}>
          <Form.Group as={Row} >
            <Form.Label column sm={5}>
              Comments*
            </Form.Label>
            <Col sm={7}>
              <Form.Control as="textarea" aria-label="With textarea" placeholder="Comments" />
            </Col>
          </Form.Group>
        </Col>
      </React.Fragment> }
      <Col lg={12} className="datapage-button-wrap">
        { !historyDpCodeData ?
          <React.Fragment>
            <Button style={{ marginRight: '1.5%' }} variant="primary" onClick={null} type="submit">Edit</Button>
            <Button style={{ marginRight: '1.5%' }} variant="danger" onClick={() => { history.push(`/pendingtasks/${currentTask.taskId}`); }} type="submit">Back</Button>
            <Button style={{ marginRight: '1.5%' }} disabled={minIndex === currentIndex} variant="primary" onClick={() => { editAndPreviousClickHandler(); }} type="submit">Previous</Button>
            {maxIndex !== currentIndex && <Button variant="success" disabled={maxIndex === currentIndex} onClick={() => { saveAndNextClickHandler(); }} type="submit">Save And Next</Button>}
            {maxIndex === currentIndex && <Button style={{ marginRight: '1.5%' }} variant="danger" onClick={() => { history.push(`/pendingtasks/${currentTask.taskId}`); }} type="submit">Save And Close</Button> }
          </React.Fragment> :
          <React.Fragment>
            <Button style={{ marginRight: '1.5%' }} variant="primary" onClick={null} type="submit">UnFreeze</Button>
          </React.Fragment> }
      </Col>
    </Row>
  );
};

export default QADataSheet;
