import './DetailDays.css'
import React, { Fragment, useState } from 'react'
import { Tabs } from 'antd';
import { NavLink } from 'react-router-dom';
import moment from 'moment';

const { TabPane } = Tabs;

export default function DetailDays(props) {

  const [state, setState] = useState({
    tabPosition: 'left',
  })


  const { tabPosition } = state;

  const gioChieu ={
    margin: '10px 0 0 0',
    padding: '5px 10px',
    border: '1px solid',
    color: '#43464b',
  }

  return (
    <div className='detailDay'>
      <div className='container'>
          <h2 className='detailDay__header mb-3 pt-3'>Mua vé theo rạp</h2>
        <div className="row">
          <Tabs tabPosition={tabPosition}>
            {
              props.heThongRapChieu?.reverse().map((heThongRap, index) => (

                <TabPane tab={<img src={heThongRap.logo} style={{ width: '50px' }} />} key={index}>
                  <Tabs tabPosition={tabPosition}>
                    {
                      heThongRap.lstCumRap?.map((cumRap, index) => (
                        <TabPane tab={
                          <div style={{ width: '300px', display: 'flex' }}>
                            <img src={heThongRap.logo} style={{ width: '50px' }} /> <br />
                            <div className='ml-2'>
                              {cumRap.tenCumRap}
                              <p className='text-left text-danger'>Chi tiết</p>
                            </div>

                          </div>}
                          key={index}>

                          {/* load fim tương ứng */}

                          {cumRap.danhSachPhim.map((phim, index) => (
                            <Fragment key={index}>
                              <div className='my-5'>
                                <div style={{ display: 'flex' }}>
                                  <img width={100} height={80} src={phim.hinhAnh} alt={phim.tenPhim} />
                                  <div className="ml-2">
                                    <h3 style={{ fontSize: '0.9rem' }} className=''>{phim.tenPhim}</h3>
                                    <p>{cumRap.diaChi}</p>

                                    <div className="grid grid-cols-6 gap-6">
                                      {phim.lstLichChieuTheoPhim?.slice(0, 12).map((lichChieu, index) => (
                                        <NavLink to={`/checkout/${lichChieu.maLichChieu}`} className='mr-2' key={index}>
                                          <div className='gioChieu'>
                                          {moment(lichChieu.ngayChieuGioChieu).format('hh:mm A')}
                                          </div>
                                        </NavLink>
                                      ))}

                                    </div>

                                  </div>
                                </div>

                              </div>
                              <hr />
                            </Fragment>
                          ))}

                        </TabPane>
                      ))
                    }
                  </Tabs>

                </TabPane>
              ))
            }

          </Tabs>
        </div>
      </div>
    </div>


  )
}
