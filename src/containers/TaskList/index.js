import React, { useRef } from 'react';
import { Col, Row, Card } from 'react-bootstrap';
import Header from '../../components/Header';
import SideMenuBar from '../../components/SideMenuBar';
import CustomTable from '../../components/CustomTable';

const TaskList = () => {
  const sideBarRef = useRef();
  const data = [
    {
      batch: 'Batch1',
      company: 'Ambuja',
      pillar: 'Environment',
      analyst: 'Balaji',
      analystSla: '10-07-2021',
      qa: 'Praveen',
      qaSla: '12-07-2021',
    },
    {
      batch: 'Batch2',
      company: 'Oil and Gas',
      pillar: 'Social',
      analyst: 'Jerin',
      analystSla: '15-07-2021',
      qa: 'Rajesh',
      qaSla: '20-07-2021',
    },
    {
      batch: 'Batch3',
      company: 'Bank of baroda',
      pillar: 'Governance',
      analyst: 'Gopi',
      analystSla: '13-07-2021',
      qa: 'Tom',
      qaSla: '15-07-2021',
    },
    {
      batch: 'batch1',
      company: 'Ambuja',
      pillar: 'Social',
      analyst: 'Sam',
      analystSla: '16-07-2021',
      qa: 'George',
      qaSla: '22-07-2021',
    },
  ];
  const totalTaskList = (props) => {
    const tableRowData = (obj) => obj.map((e) => ({
      id: e.key,
      batch: e.batch,
      company: e.company,
      pillar: e.pillar,
      analyst: e.analyst,
      analystSla: e.analystSla,
      qa: e.qa,
      qaSla: e.qaSla,
      action: <div><button className="btn btn-info">Edit</button></div>,

    }));
    return {
      rowsData: tableRowData(props),
      columnsHeadData: [
        {
          id: 'batch',
          align: 'center',
          label: 'Batch',
          dataType: 'string',
        },
        {
          id: 'company',
          align: 'center',
          label: 'Company',
          dataType: 'string',
        },
        {
          id: 'pillar',
          align: 'center',
          label: 'Pillar',
          dataType: 'string',
        },
        {
          id: 'analyst',
          align: 'center',
          label: 'Analyst',
          dataType: 'string',
        },
        {
          id: 'analystSla',
          align: 'center',
          label: 'Sla date',
          dataType: 'string',
        },
        {
          id: 'qa',
          align: 'center',
          label: 'Qa',
          dataType: 'string',
        },
        {
          id: 'qaSla',
          align: 'center',
          label: 'Sla date',
          dataType: 'string',
        },
        {
          id: 'action',
          align: 'center',
          label: 'Action',
          dataType: 'element',
        },

      ],
      tableLabel: 'Tasks',
    };
  };
  const tasklist = totalTaskList(data);
  return (
    <React.Fragment>
      <div className="main">
        <SideMenuBar ref={sideBarRef} />
        <div className="rightsidepane">
          <Header sideBarRef={sideBarRef} />
          <div className="container-main">
            <Row>
              <Col lg={12} sm={12}>
                <Card >
                  <CustomTable tableData={tasklist} />
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default TaskList;
