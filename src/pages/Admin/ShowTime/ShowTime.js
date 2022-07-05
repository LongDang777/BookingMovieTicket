import React, { useEffect, useState } from 'react';
import { Form, Cascader, DatePicker, InputNumber, Button, Select, message } from 'antd';
import { quanLyRapService } from '../../../services/QuanLyRapService';
import { useFormik } from 'formik'
import moment from 'moment';
import { quanLyDatVeService } from '../../../services/QuanLyDatVeService';
import { history } from '../../../App';
import styled from 'styled-components';

export default function ShowTime(props) {

  const formik = useFormik({
    initialValues: {
      maPhim: props.match.params.id,
      ngayChieuGioChieu: '',
      maRap: '',
      giaVe: '',
    },
    onSubmit: async (values) => {
      try {
        let result = await quanLyDatVeService.taoLichChieu(values);
        message.success(result.data.content)
        history.push('/admin/films')
      } catch (err) {
        console.log('err', err.reponse?.data);
      }
    }
  })

  const [state, setState] = useState({
    heThongRapChieu: [],
    cumRapChieu: []
  })


  useEffect(async () => {
    try {
      let result = await quanLyRapService.layThongTinHeThongRap();
      setState({
        ...state,
        heThongRapChieu: result.data.content
      })
    } catch (error) {
      console.log(error);
    }
  }, [])

  const handleChangeHeThongRap = async (value) => {
    try {
      let result = await quanLyRapService.layThongTinCumRap(value)
      setState({
        ...state,
        cumRapChieu: result.data.content
      })
    } catch (error) {
      console.log("error", error.reponse?.data);
    }
  }
  
  const handleChangeCumRap = (value) => {
    formik.setFieldValue('maRap', value)
  }
  const onOk = (values) => {
    formik.setFieldValue('ngayChieuGioChieu', moment(values).format('DD/MM/YYYY HH:mm:ss'))
  }
  const onChangeDate = (values) => {
    formik.setFieldValue('ngayChieuGioChieu', moment(values).format('DD/MM/YYYY HH:mm:ss'));
  }
  const onChangeInputNumber = (value) => {
    formik.setFieldValue('giaVe', value)
  }
  const convertSelecHRP = () => {
    return state.heThongRapChieu.map((htr) => {
      return { label: htr.tenHeThongRap, value: htr.maHeThongRap }
    })
  }

  let film = {};
  if (localStorage.getItem('filmParams')) {
    film = JSON.parse(localStorage.getItem('filmParams'))
  }

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onSubmitCapture={formik.handleSubmit}
    >
      <h3 className=''>Tạo Lịch Chiếu - <span style={{ color: "purple" }}>{props.match.params.tenphim}</span></h3>
      <div className="row mt-4">
        <div className="col-2 text-right">
          <img src={film.hinhAnh} width={200} height={300} />
        </div>
        <div className="col-8 text-left">
          <Form.Item label="Hệ thống rạp">
            <Select options={convertSelecHRP()} onChange={handleChangeHeThongRap} placeholder='Chọn hệ thống rạp' />
          </Form.Item>
          <Form.Item label="Cụm rạp">
            <Select options={state.cumRapChieu?.map(cumRap => ({
              label: cumRap.tenCumRap, value: cumRap.maCumRap
            }))}
              onChange={handleChangeCumRap} placeholder='Chọn cụm rạp' />
          </Form.Item>
          <Form.Item label="Ngày giờ chiếu">
            <DatePicker format='DD/MM/YYYY HH:mm:ss' showTime onChange={onChangeDate} onOk={onOk} />
          </Form.Item>
          <Form.Item label="Giá vé">
            <InputNumber onChange={onChangeInputNumber} />
          </Form.Item>
          <Form.Item label="Chức năng">
            <ButtonStyled type="primary" htmlType="submit">Tạo Lịch chiếu</ButtonStyled>
          </Form.Item>
        </div>
      </div>
    </Form>
  )
}
const ButtonStyled = styled(Button)`
      color: #fff;
      border-color: #1890ff !important;
      background: #1890ff;
    
`