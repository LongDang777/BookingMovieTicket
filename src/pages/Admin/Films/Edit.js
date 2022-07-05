import React, { useState } from 'react';
import {
  Form,
  Input,
  Radio,
  DatePicker,
  InputNumber,
  Switch,
  Button
} from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { layThongTinPhimAction, capNhatPhimUploadAction } from '../../../redux/actions/QuanLyPhimAction';
import { GROUP_ID } from '../../../services/TypeService';
import { useEffect } from 'react';
import styled from 'styled-components';

const Edit = (props) => {

  const [componentSize, setComponentSize] = useState('default');
  const { thongTinPhim } = useSelector(state => state.QuanLyPhimReducer);
  const { mangPhim } = useSelector(state => state.QuanLyPhimReducer);

  const tenPhim = mangPhim.map(value => { return value.tenPhim }).filter(item => item !== thongTinPhim.tenPhim)

  const [img, setImg] = useState('')
  const dispatch = useDispatch();
  useEffect(() => {
    let { id } = props.match.params;
    dispatch(layThongTinPhimAction(id));
  }, [])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      maPhim: thongTinPhim.maPhim,
      tenPhim: thongTinPhim.tenPhim,
      trailer: thongTinPhim.trailer,
      moTa: thongTinPhim.moTa,
      ngayKhoiChieu: thongTinPhim.ngayKhoiChieu,
      dangChieu: thongTinPhim.dangChieu,
      sapChieu: thongTinPhim.sapChieu,
      hot: thongTinPhim.hot,
      danhGia: thongTinPhim.danhGia,
      hinhAnh: null,
      maNhom: thongTinPhim.maNhom
    },
    validationSchema: Yup.object({
      tenPhim: Yup.string().trim('Tên phim không được để trống').required('Tên phim không được để trống').notOneOf(tenPhim, 'Tên phim bị trùng trong mã nhóm GP03'),
      trailer: Yup.string().trim('Trailer không được để trống').required('Trailer không được để trống'),
      moTa: Yup.string().trim('Mô tả không được để trống').required('Mô tả không được để trống'),
      danhGia: Yup.string().required('Số sao không được để trống'),
      ngayKhoiChieu: Yup.string().required('Ngày khởi chiếu không được để trống'),

    }),

    onSubmit: values => {
      values.maNhom = GROUP_ID
      let formData = new FormData();
      for (let key in values) {
        if (key !== 'hinhAnh') {
          formData.append(key, values[key]);
        } else {
          if (values.hinhAnh !== null) {
            formData.append('File', values.hinhAnh, values.hinhAnh.name);
          }
        }
      }
      dispatch(capNhatPhimUploadAction(formData))
    },
  })

  const handeChangDatePicker = (value) => {
    let ngayKhoiChieu = moment(value)
    formik.setFieldValue('ngayKhoiChieu', ngayKhoiChieu)

  }
  const handleChangeSwitch = (name) => {
    return (value) => {
      formik.setFieldValue(name, value)
    }
  }

  const handelChangeFile = async (e) => {
    let file = e.target.files[0];

    if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/gif' || file.type === 'image/png') {

      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImg(e.target.result)
      }
      await formik.setFieldValue('hinhAnh', file)
    }
  }

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  return (

    <Form
      onSubmitCapture={formik.handleSubmit}
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      initialValues={{
        size: componentSize,
      }}
      onValuesChange={onFormLayoutChange}
      size={componentSize}
    >
      <h3>Sửa Thông Tin - <span className='text-primary'>{thongTinPhim.tenPhim}</span> </h3>
      <Form.Item label="Form Size" name="size" className='mt-4'>
        <Radio.Group>
          <Radio.Button value="small">Small</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="large">Large</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Tên Phim">
        <Input name='tenPhim' onChange={formik.handleChange} value={formik.values.tenPhim} />
        {formik.touched.tenPhim && formik.errors.tenPhim
          ? (<div className='alert alert-danger'>{formik.errors.tenPhim}</div>)
          : null}
      </Form.Item>
      <Form.Item label="Trailer">
        <Input name='trailer' onChange={formik.handleChange} value={formik.values.trailer} />
        {formik.touched.tenPhim && formik.errors.trailer ? (
          <div className='alert alert-danger'>{formik.errors.trailer}</div>
        ) : null}
      </Form.Item>
      <Form.Item label="Mô Tả" >
        <Input name='moTa' onChange={formik.handleChange} value={formik.values.moTa} />
        {formik.touched.moTa && formik.errors.moTa ? (
          <div className='alert alert-danger'>{formik.errors.moTa}</div>
        ) : null}
      </Form.Item>
      <Form.Item label="Ngày khởi chiếu">
        <DatePicker style={{ width: '50%' }} format={'DD/MM/YYYY'} onChange={handeChangDatePicker} value={moment(formik.values.ngayKhoiChieu)} />
      </Form.Item>
      <Form.Item label="Đang chiếu">
        <SwitchStyled onChange={handleChangeSwitch('dangChieu')} checked={formik.values.dangChieu} />
      </Form.Item>
      <Form.Item label="Sắp chiếu">
        <SwitchStyled onChange={handleChangeSwitch('sapChieu')} checked={formik.values.sapChieu} />
      </Form.Item>
      <Form.Item label="Hot">
        <SwitchStyled onChange={handleChangeSwitch('hot')} checked={formik.values.hot} />
      </Form.Item>

      <Form.Item label="Số sao">
        <InputNumber placeholder='Cập nhập sao từ 1-10' style={{ width: '50%' }} onChange={handleChangeSwitch('danhGia')} min={1} max={10} value={formik.values.danhGia} maxLength={2} />
      </Form.Item>
      <Form.Item label="Hình Ảnh">
        <input type='file' onChange={handelChangeFile} accept='image/png, image/jpeg, image/png ,image/gif' />
        <br />
        <img alt="" width={150} height={200} src={img === '' ? thongTinPhim.hinhAnh : img} />
      </Form.Item>
      <Form.Item label="Tác Vụ">
        <ButtonStyled style={{ width: '50%' }} block htmlType='submit' type='primary'>Cập Nhật</ButtonStyled>
      </Form.Item>
    </Form>
  );
};

export default Edit


const ButtonStyled = styled(Button)`
      color: #fff;
      border-color: #1890ff !important;
      background: #1890ff;
    
`
const SwitchStyled = styled(Switch)`
      color: #fff;
      border-color: #1890ff !important;
      background: #1890ff;
    
`