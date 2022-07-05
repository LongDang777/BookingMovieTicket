import React, { useState } from 'react';
import {
  Form,
  Input,
  Radio,
  DatePicker,
  Switch,
  Button,
} from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { themPhimUploadHinh } from '../../../redux/actions/QuanLyPhimAction';
import { GROUP_ID } from '../../../services/TypeService';
import styled from 'styled-components';


const AddNew = () => {
  const [componentSize, setComponentSize] = useState('default');
  const [imgSrc, setImgSrc] = useState('')
  const dispatch = useDispatch();

  const { mangPhim } = useSelector(state => state.QuanLyPhimReducer);
  const tenPhim = mangPhim.map((value) => {
    return value.tenPhim
  })

  const formik = useFormik({
    initialValues: {
      tenPhim: '',
      trailer: '',
      moTa: '',
      ngayKhoiChieu: '',
      dangChieu: false,
      sapChieu: false,
      hot: false,
      danhGia: 1,
      hinhAnh: {},
    },
    validationSchema: Yup.object({
      tenPhim: Yup.string().trim('Tên phim không được để trống').required('Tên phim không được để trống').notOneOf(tenPhim, 'Tên Phim bị trùng trong mã nhóm GP03'),
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
          formData.append('File', values.hinhAnh, values.hinhAnh.name);
        }
      }
      dispatch(themPhimUploadHinh(formData));
    },
  })

  const handeChangDatePicker = (value) => {
    let ngayKhoiChieu = moment(value).format('DD/MM/YYYY')
    formik.setFieldValue('ngayKhoiChieu', ngayKhoiChieu)

  }
  const handleChangeSwitch = (name) => {
    return (value) => {
      formik.setFieldValue(name, value)
    }
  }
  const handelChangeFile = (e) => {
    let file = e.target.files[0];
    if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/gif' || file.type === 'image/png') {

      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImgSrc(e.target.result)
      }
      formik.setFieldValue('hinhAnh', file)
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
      <h3>Thêm phim mới</h3>
      <Form.Item label="Form Size" name="size">
        <Radio.Group>
          <Radio.Button value="small">Small</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="large">Large</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Tên Phim">
        <Input name='tenPhim' onChange={formik.handleChange} onBlur={formik.handleBlur}  allowClear  />
        {formik.touched.tenPhim && formik.errors.tenPhim 
        ? (<div className='alert alert-danger'>{formik.errors.tenPhim}</div>) 
        : null}
      </Form.Item>
      <Form.Item label="Trailer" >
        <Input name='trailer' onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {formik.touched.tenPhim && formik.errors.trailer ? (
          <div className='alert alert-danger'>{formik.errors.trailer}</div>
        ) : null}
      </Form.Item>
      <Form.Item label="Mô Tả" >
      <Input name='moTa' onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {formik.touched.moTa && formik.errors.moTa ? (
          <div className='alert alert-danger'>{formik.errors.moTa}</div>
        ) : null}
      </Form.Item>
      <Form.Item label="Ngày khởi chiếu">
        <DatePicker  format={'DD/MM/YYYY'} onChange={handeChangDatePicker} />
      </Form.Item>
      <Form.Item label="Đang chiếu">
        <Switch onChange={handleChangeSwitch('dangChieu')} />
      </Form.Item>
      <Form.Item label="Sắp chiếu">
        <Switch onChange={handleChangeSwitch('sapChieu')} />
      </Form.Item>
      <Form.Item label="Hot">
        <Switch onChange={handleChangeSwitch('hot')} />
      </Form.Item>

      <Form.Item label="Số sao">
        <Input style={{ width: '50%' }} placeholder='Thêm số sao từ 1-10' name='danhGia'  onChange={formik.handleChange} onBlur={formik.handleBlur}  type='number' min={1} max={10} maxLength={2} 
         />
         {formik.touched.danhGia && formik.errors.danhGia ? (
          <div className='alert alert-danger'>{formik.errors.danhGia}</div>
        ) : null}
      </Form.Item>
      <Form.Item label="Hình Ảnh">
        <input type='file' onChange={handelChangeFile} accept='image/png, image/jpeg, image/png ,image/gif'/>
        <br/>
        <img src={imgSrc} alt="" width={150} height={200}/>
      </Form.Item>
      <Form.Item label="Tác Vụ">
        <ButtonStyled style={{ width: '50%' }} block htmlType='submit' type='primary'>Thêm Phim</ButtonStyled>
      </Form.Item>
    </Form>
  );
};
export default AddNew
const ButtonStyled = styled(Button)`
      color: #fff;
      border-color: #1890ff !important;
      background: #1890ff;
    
`