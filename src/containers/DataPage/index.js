/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

import React, { useRef, useState } from 'react';
import { Col, Button } from 'react-bootstrap';
import 'antd/dist/antd.css';
import { Drawer } from 'antd';
import Header from '../../components/Header';
import SideMenuBar from '../../components/SideMenuBar';
import DataSheet from './DataSheet';
import DataAccordian from './DataAccordian';
import AddSource from './AddSource';


const DataPage = (props) => {
  console.log(props, '#######################');
  const sideBarRef = useRef();
  const [isDrawerOpened, setIsDrawerOpened] = useState(false);
  const currentRole = 'Analyst';
  // const { Panel } = Collapse;

  const apiData = [
    {
      taskId: '0001',
      pillar: 'Environmental',
      company: 'Reliance Ltd',
      year: '2018-2019',
      data: [
        {
          dpCode: 'AUDP001',
          fiscalYear: '2018-2019',
          status: 'Uncompleted',
          description: 'Does the board member hold a seat in the audit committee ?',
          dataType: 'text',
          keyIssue: 'Audit committee functioning',
          historyDpData: [
            {
              dpCode: 'AUDP001',
              fiscalYear: '2017-2018',
              status: 'Completed',
              description: 'Does the board member hold a seat in the audit committee ?',
              dataType: 'text',
              pageNo: '58',
              filePath: '',
              publicationDate: 'Tue May 11 2017',
              response: 'Yes',
              screen: 'Na',
              source: { sourceName: 'Annual Report_2019-2018', url: 'https://www.hindustanpetroleum.com/documents/doc/HPCL%20Annual%20Report%202019-2020.pdf', publicationDate: 'Tue May 04 2021' },
              textSnippet: 'Snippet One',
              url: 'www.ac.com',
            },
            {
              dpCode: 'AUDP001',
              fiscalYear: '2016-2017',
              status: 'Completed',
              description: 'Does the board member hold a seat in the audit committee ?',
              dataType: 'text',
              pageNo: '42',
              filePath: '',
              publicationDate: 'Tue May 01 2016',
              response: 'No',
              screen: 'Na',
              source: { sourceName: 'Annual Report_2019-2018', url: 'https://www.hindustanpetroleum.com/documents/doc/HPCL%20Annual%20Report%202019-2020.pdf', publicationDate: 'Tue May 04 2021' },
              textSnippet: 'Snippet Two',
              url: 'www.ab.com',
            },
          ],
        },
        {
          dpCode: 'BOCR013',
          fiscalYear: '2018-2019',
          status: 'Uncompleted',
          description: "Board member's fixed cash based compensation",
          dataType: 'number',
          keyIssue: 'Audit committee functioning',
          historyDpData: [
            {
              dpCode: 'BOCR013',
              fiscalYear: '2017-2018',
              status: 'Completed',
              description: "Board member's fixed cash based compensation",
              dataType: 'number',
              pageNo: '58',
              filePath: '',
              publicationDate: 'Tue May 11 2017',
              response: '21321',
              screen: 'Na',
              source: { sourceName: 'Annual Report_2019-2018', url: 'https://www.hindustanpetroleum.com/documents/doc/HPCL%20Annual%20Report%202019-2020.pdf', publicationDate: 'Tue May 04 2021' },
              textSnippet: 'Snippet One',
              url: 'www.ac.com',
            },
            {
              dpCode: 'BOCR013',
              fiscalYear: '2016-2017',
              status: 'Completed',
              description: "Board member's fixed cash based compensation",
              dataType: 'number',
              pageNo: '42',
              filePath: '',
              publicationDate: 'Tue May 01 2016',
              response: '213123',
              screen: 'Na',
              source: { sourceName: 'Annual Report_2019-2018', url: 'https://www.hindustanpetroleum.com/documents/doc/HPCL%20Annual%20Report%202019-2020.pdf', publicationDate: 'Tue May 04 2021' },
              textSnippet: 'Snippet Two',
              url: 'www.ab.com',
            },
          ],
        },
        {
          dpCode: 'BOIR017',
          fiscalYear: '2018-2019',
          status: 'Uncompleted',
          description: 'Board member date of appointment',
          dataType: 'date',
          keyIssue: 'Audit committee functioning',
          historyDpData: [
            {
              dpCode: 'BOIR017',
              fiscalYear: '2017-2018',
              status: 'Completed',
              description: 'Board member date of appointment',
              dataType: 'date',
              pageNo: '58',
              filePath: '',
              publicationDate: 'Tue May 11 2017',
              response: 'Tue May 01 2016',
              screen: 'Na',
              source: { sourceName: 'Annual Report_2019-2018', url: 'https://www.hindustanpetroleum.com/documents/doc/HPCL%20Annual%20Report%202019-2020.pdf', publicationDate: 'Tue May 04 2021' },
              textSnippet: 'Snippet One',
              url: 'www.ac.com',
            },
            {
              dpCode: 'BOIR017',
              fiscalYear: '2016-2017',
              status: 'Completed',
              description: 'Board member date of appointment',
              dataType: 'date',
              pageNo: '42',
              filePath: '',
              publicationDate: 'Tue May 01 2016',
              response: 'Tue May 01 2016',
              screen: 'Na',
              source: { sourceName: 'Annual Report_2019-2018', url: 'https://www.hindustanpetroleum.com/documents/doc/HPCL%20Annual%20Report%202019-2020.pdf', publicationDate: 'Tue May 04 2021' },
              textSnippet: 'Snippet Two',
              url: 'www.ab.com',
            },
          ],
        },
      ],
    },
    {
      taskId: '0002',
      pillar: 'Social',
      company: 'Reliance Ltd',
      year: '2018-2019',
      data: [
        {
          dpCode: 'AUDP001',
          fiscalYear: '2018-2019',
          status: 'Uncompleted',
          description: 'Does the board member hold a seat in the audit committee ?',
          dataType: 'text',
          keyIssue: 'Audit committee functioning',
          historyDpData: [
            {
              dpCode: 'AUDP001',
              fiscalYear: '2017-2018',
              status: 'Completed',
              description: 'Does the board member hold a seat in the audit committee ?',
              dataType: 'text',
              pageNo: '58',
              filePath: '',
              publicationDate: 'Tue May 11 2017',
              response: 'Yes',
              screen: 'Na',
              source: { sourceName: 'Annual Report_2019-2018', url: 'https://www.hindustanpetroleum.com/documents/doc/HPCL%20Annual%20Report%202019-2020.pdf', publicationDate: 'Tue May 04 2021' },
              textSnippet: 'Snippet One',
              url: 'www.ac.com',
            },
            {
              dpCode: 'AUDP001',
              fiscalYear: '2016-2017',
              status: 'Completed',
              description: 'Does the board member hold a seat in the audit committee ?',
              dataType: 'text',
              pageNo: '42',
              filePath: '',
              publicationDate: 'Tue May 01 2016',
              response: 'No',
              screen: 'Na',
              source: { sourceName: 'Annual Report_2019-2018', url: 'https://www.hindustanpetroleum.com/documents/doc/HPCL%20Annual%20Report%202019-2020.pdf', publicationDate: 'Tue May 04 2021' },
              textSnippet: 'Snippet Two',
              url: 'www.ab.com',
            },
          ],
        },
        {
          dpCode: 'BOCR013',
          fiscalYear: '2018-2019',
          status: 'Uncompleted',
          description: "Board member's fixed cash based compensation",
          dataType: 'number',
          keyIssue: 'Audit committee functioning',
          historyDpData: [
            {
              dpCode: 'BOCR013',
              fiscalYear: '2017-2018',
              status: 'Completed',
              description: "Board member's fixed cash based compensation",
              dataType: 'number',
              pageNo: '58',
              filePath: '',
              publicationDate: 'Tue May 11 2017',
              response: '21321',
              screen: 'Na',
              source: { sourceName: 'Annual Report_2019-2018', url: 'https://www.hindustanpetroleum.com/documents/doc/HPCL%20Annual%20Report%202019-2020.pdf', publicationDate: 'Tue May 04 2021' },
              textSnippet: 'Snippet One',
              url: 'www.ac.com',
            },
            {
              dpCode: 'BOCR013',
              fiscalYear: '2016-2017',
              status: 'Completed',
              description: "Board member's fixed cash based compensation",
              dataType: 'number',
              pageNo: '42',
              filePath: '',
              publicationDate: 'Tue May 01 2016',
              response: '213123',
              screen: 'Na',
              source: { sourceName: 'Annual Report_2019-2018', url: 'https://www.hindustanpetroleum.com/documents/doc/HPCL%20Annual%20Report%202019-2020.pdf', publicationDate: 'Tue May 04 2021' },
              textSnippet: 'Snippet Two',
              url: 'www.ab.com',
            },
          ],
        },
        {
          dpCode: 'BOIR017',
          fiscalYear: '2018-2019',
          status: 'Uncompleted',
          description: 'Board member date of appointment',
          dataType: 'date',
          keyIssue: 'Audit committee functioning',
          historyDpData: [
            {
              dpCode: 'BOIR017',
              fiscalYear: '2017-2018',
              status: 'Completed',
              description: 'Board member date of appointment',
              dataType: 'date',
              pageNo: '58',
              filePath: '',
              publicationDate: 'Tue May 11 2017',
              response: 'Tue May 01 2016',
              screen: 'Na',
              source: { sourceName: 'Annual Report_2019-2018', url: 'https://www.hindustanpetroleum.com/documents/doc/HPCL%20Annual%20Report%202019-2020.pdf', publicationDate: 'Tue May 04 2021' },
              textSnippet: 'Snippet One',
              url: 'www.ac.com',
            },
            {
              dpCode: 'BOIR017',
              fiscalYear: '2016-2017',
              status: 'Completed',
              description: 'Board member date of appointment',
              dataType: 'date',
              pageNo: '42',
              filePath: '',
              publicationDate: 'Tue May 01 2016',
              response: 'Tue May 01 2016',
              screen: 'Na',
              source: { sourceName: 'Annual Report_2019-2018', url: 'https://www.hindustanpetroleum.com/documents/doc/HPCL%20Annual%20Report%202019-2020.pdf', publicationDate: 'Tue May 04 2021' },
              textSnippet: 'Snippet Two',
              url: 'www.ab.com',
            },
          ],
        },
      ],
    },
    {
      taskId: '0003',
      pillar: 'Governance',
      company: 'Reliance Ltd',
      year: '2018-2019',
      data: [
        {
          dpCode: 'AUDP001',
          fiscalYear: '2018-2019',
          status: 'Uncompleted',
          description: 'Does the board member hold a seat in the audit committee ?',
          dataType: 'text',
          keyIssue: 'Audit committee functioning',
          historyDpData: [
            {
              dpCode: 'AUDP001',
              fiscalYear: '2017-2018',
              status: 'Completed',
              description: 'Does the board member hold a seat in the audit committee ?',
              dataType: 'text',
              pageNo: '58',
              filePath: '',
              publicationDate: 'Tue May 11 2017',
              response: 'Yes',
              screen: 'Na',
              source: { sourceName: 'Annual Report_2019-2018', url: 'https://www.hindustanpetroleum.com/documents/doc/HPCL%20Annual%20Report%202019-2020.pdf', publicationDate: 'Tue May 04 2021' },
              textSnippet: 'Snippet One',
              url: 'www.ac.com',
            },
            {
              dpCode: 'AUDP001',
              fiscalYear: '2016-2017',
              status: 'Completed',
              description: 'Does the board member hold a seat in the audit committee ?',
              dataType: 'text',
              pageNo: '42',
              filePath: '',
              publicationDate: 'Tue May 01 2016',
              response: 'No',
              screen: 'Na',
              source: { sourceName: 'Annual Report_2019-2018', url: 'https://www.hindustanpetroleum.com/documents/doc/HPCL%20Annual%20Report%202019-2020.pdf', publicationDate: 'Tue May 04 2021' },
              textSnippet: 'Snippet Two',
              url: 'www.ab.com',
            },
          ],
        },
        {
          dpCode: 'BOCR013',
          fiscalYear: '2018-2019',
          status: 'Uncompleted',
          description: "Board member's fixed cash based compensation",
          dataType: 'number',
          keyIssue: 'Audit committee functioning',
          historyDpData: [
            {
              dpCode: 'BOCR013',
              fiscalYear: '2017-2018',
              status: 'Completed',
              description: "Board member's fixed cash based compensation",
              dataType: 'number',
              pageNo: '58',
              filePath: '',
              publicationDate: 'Tue May 11 2017',
              response: '21321',
              screen: 'Na',
              source: { sourceName: 'Annual Report_2019-2018', url: 'https://www.hindustanpetroleum.com/documents/doc/HPCL%20Annual%20Report%202019-2020.pdf', publicationDate: 'Tue May 04 2021' },
              textSnippet: 'Snippet One',
              url: 'www.ac.com',
            },
            {
              dpCode: 'BOCR013',
              fiscalYear: '2016-2017',
              status: 'Completed',
              description: "Board member's fixed cash based compensation",
              dataType: 'number',
              pageNo: '42',
              filePath: '',
              publicationDate: 'Tue May 01 2016',
              response: '213123',
              screen: 'Na',
              source: { sourceName: 'Annual Report_2019-2018', url: 'https://www.hindustanpetroleum.com/documents/doc/HPCL%20Annual%20Report%202019-2020.pdf', publicationDate: 'Tue May 04 2021' },
              textSnippet: 'Snippet Two',
              url: 'www.ab.com',
            },
          ],
        },
        {
          dpCode: 'BOIR017',
          fiscalYear: '2018-2019',
          status: 'Uncompleted',
          description: 'Board member date of appointment',
          dataType: 'date',
          keyIssue: 'Audit committee functioning',
          historyDpData: [
            {
              dpCode: 'BOIR017',
              fiscalYear: '2017-2018',
              status: 'Completed',
              description: 'Board member date of appointment',
              dataType: 'date',
              pageNo: '58',
              filePath: '',
              publicationDate: 'Tue May 11 2017',
              response: 'Tue May 01 2016',
              screen: 'Na',
              source: { sourceName: 'Annual Report_2019-2018', url: 'https://www.hindustanpetroleum.com/documents/doc/HPCL%20Annual%20Report%202019-2020.pdf', publicationDate: 'Tue May 04 2021' },
              textSnippet: 'Snippet One',
              url: 'www.ac.com',
            },
            {
              dpCode: 'BOIR017',
              fiscalYear: '2016-2017',
              status: 'Completed',
              description: 'Board member date of appointment',
              dataType: 'date',
              pageNo: '42',
              filePath: '',
              publicationDate: 'Tue May 01 2016',
              response: 'Tue May 01 2016',
              screen: 'Na',
              source: { sourceName: 'Annual Report_2019-2018', url: 'https://www.hindustanpetroleum.com/documents/doc/HPCL%20Annual%20Report%202019-2020.pdf', publicationDate: 'Tue May 04 2021' },
              textSnippet: 'Snippet Two',
              url: 'www.ab.com',
            },
          ],
        },
      ],
    },
  ];

  const getDataForDataSheet = (data) => {
    const { taskId, dpcode } = props.match.params;
    const [currentTask] = data.filter((task) => (task.taskId === taskId));
    const max = currentTask.data.length - 1;
    const min = 0;
    return (currentTask.data.map((dpData, index) => {
      if (dpData.dpCode === dpcode) {
        return ({
          maxIndex: max, minIndex: min, currentIndex: index, currentDpCode: dpData, currentTask,
        });
      }
      return null;
    })).filter((e) => (e !== null));
  };
  const openDrawer = () => {
    setIsDrawerOpened(true);
  };
  const [{
    maxIndex, minIndex, currentIndex, currentDpCode, currentTask,
  }] = getDataForDataSheet(apiData);
  console.log(getDataForDataSheet(apiData));


  return (
    <div className="main">
      <SideMenuBar ref={sideBarRef} />
      <div className="rightsidepane">
        <Header sideBarRef={sideBarRef} />
        <div className="datapage-main" >
          <div className="datapage-info-group">
            <Drawer
              title="Add Source"
              placement="right"
              closable={false}
              onClose={() => setIsDrawerOpened(false)}
              visible={isDrawerOpened}
              key="right"
              width={300}
              headerStyle={{ backgroundColor: '#2199c8' }}
            >
              <AddSource></AddSource>
            </Drawer>
            {currentRole === 'Analyst' &&
            <Col lg={12} style={{ padding: 0, margin: '3% 0' }}>
              <DataAccordian header="History">
                <DataSheet historyDpCodeData currentDpCode={currentDpCode} location={props.location} />
              </DataAccordian>
            </Col>}
            <Col lg={12} style={{ padding: 0, margin: '3% 0' }}>
              <DataAccordian header="Current" isActive >
                <DataSheet maxIndex={maxIndex} minIndex={minIndex} currentIndex={currentIndex} currentDpCode={currentDpCode} currentTask={currentTask} location={props.location} openDrawer={openDrawer} />
              </DataAccordian>
            </Col>
            {/* <Collapse accordion>
              <Panel header="This is panel header 1" key="1">
                <DataX maxIndex={maxIndex} minIndex={minIndex} currentIndex={currentIndex} currentDpCode={currentDpCode} currentTask={currentTask} location={props.location} />
              </Panel>
            </Collapse> */}
          </div>
        </div>
      </div>
    </div>
  );
};


export default DataPage;
