/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { DatePicker, Button as AntButton, Image, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Select from 'react-select';
import moment from 'moment';

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

const ErrorDataSheet = (props) => {
  const {
    textResponse, sourceList, isErrorCommentType, visible, isError,
  } = props;

  const defaultData = props.reqData;
  const formDescription = defaultData.description;
  const formDataType = defaultData.dataType.toUpperCase();

  console.log(defaultData);

  const [formTextSnippet, setFormTextSnippet] = useState(((isErrorCommentType || isError) ? defaultData.textSnippet : ''));
  const [formPageNo, setFormPageNo] = useState(((isErrorCommentType || isError) ? defaultData.pageNo : ''));
  const [formScreenShotPath, setFormScreenShotPath] = useState(((isErrorCommentType || isError) ? defaultData.screenShot : ''));
  const [formResponse, setFormResponse] = useState(((isErrorCommentType || isError) ? defaultData.response : ''));
  const [formSource, setFormSource] = useState(((isErrorCommentType || isError) ? defaultData.source : ''));
  const [formURL, setFormURL] = useState(((isErrorCommentType || isError) ? (defaultData.source && defaultData.source.url) : ''));
  const [formPublicDate, setFormPublicDate] = useState(((isErrorCommentType || isError) ? (defaultData.source && defaultData.source.publicationDate) : ''));
  const [formScreenShotFile, setFormScreenShotFile] = useState(null);
  const [formComment, setFormComment] = useState('');

  console.log('SRCCCCC', formSource);
  useEffect(() => {
    setFormTextSnippet(((isErrorCommentType || isError) ? defaultData.textSnippet : ''));
    setFormPageNo(((isErrorCommentType || isError) ? defaultData.pageNo : ''));
    setFormScreenShotPath(((isErrorCommentType || isError) ? defaultData.screenShot : ''));
    setFormResponse(((isErrorCommentType || isError) ? defaultData.response : ''));
    setFormSource(((isErrorCommentType || isError) ? defaultData.response : ''));
    setFormURL(((isErrorCommentType || isError) ? (defaultData.source && defaultData.source.url) : ''));
    setFormPublicDate(((isErrorCommentType || isError) ? (defaultData.source && defaultData.source.publicationDate) : ''));
    setFormScreenShotFile(null);
    setFormComment('');
  }, [props.locationData, defaultData]);

  const onChangeFormTextSnippet = (event) => {
    setFormTextSnippet(event.currentTarget.value);
  };

  const onChangeFormPageNo = (event) => {
    setFormPageNo(event.currentTarget.value);
  };

  const onChangeFormScreenShotPath = (event) => {
    setFormScreenShotPath(event.fileList[0] && URL.createObjectURL(event.fileList[0].originFileObj));
    setFormScreenShotFile(event);
  };

  const onChangeFormResponse = (event) => {
    switch (formDataType) {
      case 'TEXT':
        setFormResponse(event.value);
        break;
      case 'DATE':
        setFormResponse(event);
        break;
      case 'NUMBER':
        setFormResponse(event.currentTarget.value);
        break;
      default:
        break;
    }
  };

  const onChangeFormSource = (event) => {
    setFormSource(event.value);
    setFormURL(event.value.url);
    setFormPublicDate(event.value.publicationDate);
  };

  const onChangeFormURL = (event) => {
    setFormURL(event.currentTarget.value);
  };

  const onChangeFormPublicDate = (event) => {
    setFormPublicDate(event);
  };

  const onChangeFormComment = (event) => {
    setFormComment(event.currentTarget.value);
  };

  const screenShotBeforeUpload = (file) => {
    if (!(file.type).includes('image')) {
      message.error(`${file.name} is not a image file`);
      return Upload.LIST_IGNORE;
    }
    return false;
  };

  const onClickSave = () => {
    const dummyDataReps = {
      fiscalYear: defaultData.fiscalYear,
      error: {
        isThere: isError,
        refData: {
          textSnippet: formTextSnippet,
          pageNo: formPageNo,
          screenShot: formScreenShotPath,
          response: formResponse,
          source: formSource,
          url: formURL,
          publicationDate: formPublicDate,
        },
        comment: formComment,
        errorStatus: 'Completed',
      },
    };

    props.onClickSave(dummyDataReps);
  };

  const onClickEdit = () => {
    const dummyDataReps = {
      fiscalYear: defaultData.fiscalYear,
      error: {
        isThere: isError,
        refData: {
          textSnippet: formTextSnippet,
          pageNo: formPageNo,
          screenShot: formScreenShotPath,
          response: formResponse,
          source: formSource,
          url: formURL,
          publicationDate: formPublicDate,
        },
        comment: formComment,
        errorStatus: 'unknown',
      },
    };

    props.onClickSave(dummyDataReps);
  };

  return (
    <React.Fragment>

      {/* HORIZONTAL Line */}
      {!isErrorCommentType && visible && isError &&
        <Col lg={12} className="datapage-horizontalLine"></Col>}

      {/* DESCRIPTION Field */}
      <FieldWrapper
        label="Description*"
        visible={visible && isError}
        body={formDescription}
      />

      {/* RESPONSE Field */}
      { formDataType === 'NUMBER' &&
        <FieldWrapper
          label="Response*"
          visible={visible && isError}
          body={
            <Form.Control
              type="text"
              name="response"
              placeholder="Response"
              onChange={onChangeFormResponse}
              disabled={isErrorCommentType}
              value={formResponse}
            />
          }
        />}

      {/* RESPONSE Field */}
      { formDataType === 'DATE' &&
        <FieldWrapper
          label="Response*"
          visible={visible && isError}
          body={
            <DatePicker
              className="datapage-datepicker"
              name="response"
              size="large"
              onChange={onChangeFormResponse}
              disabled={isErrorCommentType}
              value={formResponse && moment(formResponse)}
            />
          }
        />}

      {/* RESPONSE Field */}
      { formDataType === 'TEXT' &&
        <FieldWrapper
          label="Response*"
          visible={visible && isError}
          body={
            <Select
              name="response"
              options={textResponse && textResponse.map((e) => ({ label: e, value: e }))}
              onChange={onChangeFormResponse}
              isDisabled={isErrorCommentType}
              value={formResponse && { label: formResponse, value: formResponse }}
              placeholder="Choose Response"
            />
          }
        />}

      {/* SOURCE Field */}
      <FieldWrapper
        label="Source*"
        visible={visible && isError}
        body={
          <Select
            name="source"
            options={sourceList && sourceList.map((e) => ({ label: e.sourceName, value: e }))}
            onChange={onChangeFormSource}
            isDisabled={isErrorCommentType}
            value={formSource && { label: formSource.sourceName, value: formSource }}
            placeholder="Choose Source File"
          />
        }
      />

      {/* ADD SOURCE Button */}
      {!isErrorCommentType && visible && isError &&
        <Col lg={6}>
          <Button onClick={props.openSourcePanel}>Add Source</Button>
        </Col>}

      {/* URL Field */}
      <FieldWrapper
        label="URL*"
        visible={isErrorCommentType && visible && isError}
        body={
          <Form.Control
            type="text"
            name="url"
            placeholder="Url"
            onChange={onChangeFormURL}
            disabled={isErrorCommentType}
            value={formURL}
          />
        }
      />

      {/* PUBLICATION DATE Field */}
      <FieldWrapper
        label="PublicationDate*"
        visible={isErrorCommentType && visible && isError}
        body={
          <DatePicker
            className="datapage-datepicker"
            name="publicationDate"
            size="large"
            onChange={onChangeFormPublicDate}
            disabled={isErrorCommentType}
            value={formPublicDate && moment(formPublicDate)}
          />
        }
      />

      {/* TEXT SNIPPET Field */}
      <FieldWrapper
        label="Text Snippet*"
        visible={visible && isError}
        body={
          <Form.Control
            as="textarea"
            name="textSnippet"
            placeholder="Snippet"
            onChange={onChangeFormTextSnippet}
            disabled={isErrorCommentType}
            value={formTextSnippet}
          />
        }
      />

      {/* PAGE NO Field */}
      <FieldWrapper
        label="Page No*"
        visible={visible && isError}
        body={
          <Form.Control
            type="number"
            placeholder="Page No"
            onChange={onChangeFormPageNo}
            disabled={isErrorCommentType}
            value={formPageNo}
          />
        }
      />

      {/* UPLOAD Field */}
      <FieldWrapper
        label="Upload Screenshot*"
        visible={!isErrorCommentType && visible && isError}
        body={
          <Upload
            className="datapage-ant-upload"
            maxCount={1}
            fileList={formScreenShotFile && formScreenShotFile.fileList}
            beforeUpload={screenShotBeforeUpload}
            onChange={onChangeFormScreenShotPath}
          >
            <AntButton
              className="datapage-ant-button"
              icon={<UploadOutlined />}
            >Click to Upload
            </AntButton>
          </Upload>
        }
      />

      {/* ScreenShot Field */}
      <FieldWrapper
        label="Screenshot*"
        visible={visible && isError}
        body={
          <Image
            width="50%"
            src={formScreenShotPath}
          />
        }
      />

      {/* Comments Field */}
      <FieldWrapper
        label="Comments*"
        visible={!isErrorCommentType && visible && isError}
        body={
          <Form.Control
            as="textarea"
            aria-label="With textarea"
            placeholder="Comments"
            onChange={onChangeFormComment}
            value={formComment}
          />
        }
      />

      <Col lg={12} className="datapage-button-wrap">
        { !isErrorCommentType && visible && (defaultData.error ? defaultData.error.errorStatus !== 'Completed' : true) &&
        <Button className="datapage-button" variant="success" onClick={onClickSave}>{`Save ${defaultData.fiscalYear}`}</Button>}
        { !isErrorCommentType && visible && (defaultData.error && defaultData.error.errorStatus === 'Completed') &&
        <Button className="datapage-button" variant="primary" onClick={onClickEdit}>{`Edit ${defaultData.fiscalYear}`}</Button>}
      </Col>
    </React.Fragment>
  );
};

export default ErrorDataSheet;
