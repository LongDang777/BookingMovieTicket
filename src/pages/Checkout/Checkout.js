import React, { Fragment, useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import '../../assets/style/reset.scss'
import './style.css'
import styled from 'styled-components';
import { datGheAction, datVeAction, layChiTietPhongVeAction } from '../../action/QuanLyDatVeAction';
import { CheckOutlined, CloseOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons';
import ThongTinDatVe from '../../_core/models/ThongTinDatVe';
import { Tabs } from 'antd';
import { layThongTinTaiKhoanAction } from '../../redux/actions/QuanLyNguoiDungAction';
import moment from 'moment';
import _ from 'lodash'
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import { connection } from '../../index';
import { history } from '../../App';
import { NavLink, Redirect } from 'react-router-dom';

const Checkout = (props) => {
    const dispatch = useDispatch()
    const { userLogin } = useSelector(state => state.LogReducer);
    const { chiTietPhongVe, danhSachGheDangDat, danhSachGheKhachDat } = useSelector(state => state.QuanLyDatVeReducer)

    useEffect(() => {
        let { id } = props.match.params;
        const action = layChiTietPhongVeAction(id);
        dispatch(action)

        // có user nào đó đặt vé thành công => load lại ds ghế
        connection.on('datVeThanhCong', () => {
            dispatch(action)
        })


        // load ds ghế người khác dang dat khi vào trang
        connection.invoke('loadDanhSachGhe', props.match.params.id)


        //lay danh sach ghe dang dat tu server
        connection.on("loadDanhSachGheDaDat", (dsGheKhachDat) => {

            // loai user ra khoi danh sach khach dat
            dsGheKhachDat = dsGheKhachDat.filter(item => item.taiKhoan !== userLogin.taiKhoan);
            // gộp all ghế khach dang dat
            let arrGheKhachDat = dsGheKhachDat.reduce((result, item, index) => {
                let arrGhe = JSON.parse(item.danhSachGhe);
                return [...result, ...arrGhe]
            }, [])

            // loại bỏ ghế nhiều khách đặt cùng một lần (cap nhật redux)
            arrGheKhachDat = _.uniqBy(arrGheKhachDat, 'maGhe')
            dispatch({
                type: 'DAT_GHE',
                arrGheKhachDat
            })
            // setup reload trang khi nguoi khac dat ve
            window.addEventListener('beforeunload', clearGhe);
            return () => {
                clearGhe();
                window.removeEventListener('beforeunload', clearGhe)
            }
        })
    }, [])
    const clearGhe = (e) => {
        connection.invoke('huyDat', userLogin.taiKhoan, props.match.params.id)
    }


    const { danhSachGhe, thongTinPhim } = chiTietPhongVe
    const renderSeats = () => {
        return danhSachGhe?.map((seat, index) => {
            let classGheVip = seat.loaiGhe === 'Vip' ? 'ghe-vip' : '';
            let classGheDaDat = seat.daDat === true ? 'ghe-da-dat' : '';
            let classGheDangDat = '';
            let classGheDaDuocDat = '';
            let indexGheDD = danhSachGheDangDat.findIndex(gheDD => gheDD.maGhe === seat.maGhe)

            //check ghế khách đặt
            let classGheKhachDat = '';
            let indexGheKD = danhSachGheKhachDat.findIndex(gheKD => gheKD.maGhe === seat.maGhe);
            if (indexGheKD !== -1) {
                classGheKhachDat = 'ghe-khach-dat'
            }

            if (userLogin.taiKhoan === seat.taiKhoanNguoiDat) {
                classGheDaDuocDat = 'ghe-da-duoc-dat'
            }

            if (indexGheDD != -1) {
                classGheDangDat = 'ghe-dang-dat'
            }
            return <Fragment key={index}>
                <button onClick={() => {
                    const action = datGheAction(seat, props.match.params.id)
                    dispatch(action)

                }} disabled={seat.daDat || classGheKhachDat !== ''} className={`ghe ${classGheVip} ${classGheDaDat} ${classGheDangDat} ${classGheDaDuocDat} ${classGheKhachDat}`}>
                    {seat.daDat ? classGheDaDuocDat != '' ? <UserOutlined /> : <CloseOutlined /> : classGheKhachDat !== '' ? <UserOutlined /> : seat.stt}
                </button>
                {(index + 1) % 16 === 0 ? <br /> : ''}
            </Fragment>
        })
    }

    return (
        <CheckoutStyled className="min-height-100vh">
            <div className='grid grid-cols-12 m-t-20'>
                <div className="col-span-9">
                    <div className='screen flex flex-col items-center m-t-5'>
                        <div className='bg-black w-full'></div>
                        <div className="trapezoid">Màn Hình</div>
                        <div className='m-t-30'>
                            {renderSeats()}
                        </div>

                    </div>
                </div>
                <div className="col-span-3">
                    <h3 className='text-center text-2xl text-green-500 fw-700'>
                        {danhSachGheDangDat.reduce((tongTien, ghe, index) => {
                            return tongTien += ghe.giaVe;
                        }, 0).toLocaleString()} đ
                    </h3>
                    <hr />
                    <div className=' m-y-20'>
                        <h3 className='text-xl fw-700'>{thongTinPhim?.tenPhim}</h3>
                        <p>Địa điểm: {thongTinPhim?.tenCumRap} - {thongTinPhim?.tenRap}</p>
                        <p>Ngày chiếu: {thongTinPhim?.ngayChieu} - {thongTinPhim?.gioChieu}</p>
                    </div>
                    <hr />
                    <div className="flex flex-row m-y-20 justify-content-between">
                        <div className='w-4/6'>
                            <span className='text-red-400 text-lg'>Ghế:</span>
                            {(danhSachGheDangDat).map((gheDD, index) => {
                                return <span key={index} className='text-green-500 text-lg'> {gheDD.stt}</span>
                            })}
                        </div>
                        <div className='text-right'>
                            <span className='text-green-800 text-lg'>
                                {danhSachGheDangDat.reduce((tongTien, ghe, index) => {
                                    return tongTien += ghe.giaVe;
                                }, 0).toLocaleString()} đ
                            </span>
                        </div>
                    </div>
                    <hr />
                    <div className="m-y-20">
                        <i>Email</i> <br />
                        {userLogin.email}
                    </div>
                    <div className="m-y-20">
                        <i>Phone</i> <br />
                        {userLogin.soDT}
                    </div>
                    <div className='mb-0 flex flex-col items-center'>
                        <button onClick={() => {
                            const thongTinDatVe = new ThongTinDatVe();
                            thongTinDatVe.maLichChieu = props.match.params.id;
                            thongTinDatVe.danhSachVe = danhSachGheDangDat;
                            dispatch(datVeAction(thongTinDatVe))

                        }} className='pointer bg-green-500 text-white w-full text-center p-y-6 fw-500 fs-18 radius-5'>
                            ĐẶT VÉ
                        </button>
                    </div>

                    <div className='m-t-20'>
                        <div className='seat-desc'>
                            <p className='seat-name'>Ghế thường: </p>
                            <button className='ghe'><CheckOutlined /></button>
                        </div>
                        <div className='seat-desc'>
                            <p className='seat-name'>Ghế VIP: </p>
                            <button className='ghe ghe-vip'><CheckOutlined /></button>
                        </div>
                        <div className='seat-desc'>
                            <p className='seat-name'>Ghế đang đặt: </p>
                            <button className='ghe ghe-dang-dat'><CheckOutlined /></button>
                        </div>
                        <div className='seat-desc'>
                            <p className='seat-name'>Ghế đã đặt: </p>
                            <button className='ghe ghe-da-dat'><CloseOutlined /></button>
                        </div>
                        <div className='seat-desc'>
                            <p className='seat-name'>Ghế đã được đặt: </p>
                            <button className='ghe ghe-da-duoc-dat'><UserOutlined /></button>
                        </div>
                        <div className='seat-desc'>
                            <p className='seat-name'>Ghế khách đang đặt:  </p>
                            <button className='ghe ghe-khach-dat'><UserOutlined /></button>
                        </div>
                    </div>
                </div>
            </div>
        </CheckoutStyled>
    )
}





const CheckoutStyled = styled.div`
    width: 90%;
    margin: 40px auto;

    .bg-black {
        height: 10px;
        width: 80%;
    }

    .trapezoid {
        border-bottom: 50px solid rgba(128, 128, 128, 0.2);
        border-left: 25px solid transparent;
        border-right: 25px solid transparent;
        height: 0;
        width: 80%;
        filter: drop-shadow(0px 10px 50px grey);
        -webkit-filter: drop-shadow(0px 10px 50px grey);
        -moz-filter: drop-shadow(0px 10px 50px grey);
        text-align: center;
        color: #000;
        line-height: 45px;
    }

    .ghe {
        width: 35px;
        height: 35px;
        border-radius: 5px;
        cursor: pointer;
        margin: 10px;
        background-color: rgb(122, 122, 122);
    }

    .ghe-vip {
        background-color: #e86b36;
    }

    .ghe-dang-dat {
        background-color: rgb(18, 176, 18) !important;
    }
    
    .ghe-da-dat {
        background-color: #fb2c2c;
        color: #fff;
        cursor: no-drop;
    }

    .ghe-da-duoc-dat {
        background-color: rgb(246, 246, 246);
        color: orange !important;
        box-shadow: rgb(255 165 0 / 50%) 0px 0px 4px 1px;
        -webkit-box-shadow: rgb(255 165 0 / 50%) 0px 0px 4px 1px;
    }
    .ghe-khach-dat {
        background-color: rgb(242, 26, 191) !important;
        cursor: no-drop

    }
    .anticon {
        margin-bottom: 6px;
    }

    .seat-desc {
        display: flex;
        align-items: center;
    
        .seat-name {
            width: 150px;
        }

        .ghe {
            margin: 0 0 10px;
        }

    }
`
const { TabPane } = Tabs;
function callback(key) {
    console.log(key);
}

export default function (props) {
    const { tabActive } = useSelector(state => state.QuanLyDatVeReducer)
    const { userLogin } = useSelector(state => state.LogReducer)
    const dispatch = useDispatch();

   

    if(!localStorage.getItem("LOGIN_USER")){
        alert('Bạn không có quyền  truy cập vào trang này vui lòng đăng nhập!')
        return <Redirect to='/'/>
      };
      
     
    useEffect(()=>{
        return ()=>{
            dispatch({
                type: 'CHANGE_TAB_ACTIVE',
                number: '1'
            })
        }
    },[])

    const operations = <Fragment>
        {!_.isEmpty(userLogin)
            ? <Fragment>
                <button onClick={() => {
                    // history.push('/profile')
                }} className='text-blue-900'>
                    <div style={{ width: 50, height: 50, display: 'flex', justifyContent: 'center', alignItems: 'center', }} className='text-2xl ml-5 text-red-800 rounded-full bg-red-200'> {userLogin.taiKhoan.substr(0, 1)}
                    </div>
                    Hello! <span style={{color:'yellowgreen'}}>{userLogin.taiKhoan}</span>  </button>
                <button className='text-blue-900' onClick={() => {
                    localStorage.removeItem("LOGIN_USER");
                    localStorage.removeItem("TOKEN_MOVIE")
                    history.push('/');
                    window.location.reload();
                }}>Đăng Xuất</button>
            </Fragment>
            : ''}
    </Fragment>


    return (
        <Fragment>
            <div className='p-5 '>
                <Tabs tabBarExtraContent={operations} defaultActiveKey='1' activeKey={tabActive} onChange={(key) => {
                    dispatch({
                        type: 'CHANGE_TAB_ACTIVE',
                        number: key.toString()
                    })
                }} >
                    <TabPane tab="01 CHỌN GHẾ & THANH TOÁN" key="1">
                        <Checkout {...props} />
                    </TabPane>
                    <TabPane tab="02 KẾT QUẢ ĐẶT VÉ" key="2">
                        <KetQuaDatVe {...props} />
                    </TabPane>
                    <TabPane tab={<div className='text-center' style={{display:'flex',justifyContent:'center',alignItems:'center'}}> <NavLink to='/'><HomeOutlined style={{marginLeft:10, color:'yellowgreen', fontSize:25}}/></NavLink></div>} key="3">
                        
                    </TabPane>
                </Tabs>
            </div>
        </Fragment>
    )
}

function KetQuaDatVe(props) {

    const dispatch = useDispatch()
    const { userLogin } = useSelector(state => state.LogReducer);
    const { thongTinTK } = useSelector(state => state.QuanLyNguoiDungReducer)
    useEffect(() => {
        const action = layThongTinTaiKhoanAction();
        dispatch(action)
    }, [])


    const renderTicketItem = () => {
        return thongTinTK.thongTinDatVe?.map((ticket, index) => {
            const seats = _.first(ticket.danhSachGhe);
            return (

                <div className="p-2 lg:w-1/3 md:w-1/2 w-full" key={`${ticket.maVe}`}>
                    <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                        <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src={ticket.hinhAnh} />
                        <div className="flex-grow">
                            <h2 className="text-pink-900 title-font font-medium">{ticket.tenPhim}</h2>
                            <p className="text-gray-500">Giờ Chiếu: <span className='text-dark font-weight-bold'>{moment(ticket.ngayDat).format('hh:mm A')}</span> -  Ngày Chiếu: <span className='text-dark font-weight-bold'> {moment(ticket.ngayDat).format('DD-MM-YYYY')}</span></p>
                            <p className="text-gray-500">Địa điểm: <span className="text-gray-900">{seats.tenHeThongRap}</span> </p>
                            <p >{seats.tenCumRap} - Ghế: {ticket.danhSachGhe.map((ghe, index) => { return <span key={index} className='text-green-500'>-[{ghe.tenGhe}]</span> })}</p>
                        </div>
                    </div>
                </div>
            )
        })
    }

    return (
        <div className='p-5'>
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-col text-center w-full mb-20">
                        <h1 className="sm:text-3xl text-2xl font-medium mb-4 text-purple-600">Lịch sử đặt vé khách hàng</h1>
                        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Cám ơn bạn đã đạt vé. Hãy kiểm tra lại thông tin. để sắp xếp thời xem phim vui vẻ nhé ^-^</p>
                    </div>
                    <div className="flex flex-wrap -m-2">
                        {renderTicketItem()}
                    </div>
                </div>
            </section>

        </div>
    )
}



