import React, {Component} from "react";
import {Button, DatePicker, Form, Input, message, Radio, Select} from "antd";
import axios from "axios";
import dayjs from "dayjs";
import zhCN from 'antd/locale/zh_CN';

class EditEmpFrm extends Component {

    dateFormat = 'YYYY-MM-DD';

    onFinish = (values) => {
        const params = {
            ...values,
            empId:this.props.data.empId
        };

        let date = new Date(params.birthday);
        const moment = require('moment');
        const formattedDate = moment(date).format('YYYY-MM-DD');
        params.birthday = formattedDate;

        const formData = new FormData();
        for (const key in params) {
            formData.append(key,params[key])
        }

        axios
            .put("/emp/emp/update", formData)
            .then((res) => {
                message.info("修改商品成功");
                this.props.closeModal();
            })
            .catch((error) => {
                console.log("error=", error);
            });
    };

    formRef = React.createRef();

    componentDidMount() {
        this.props.data.birthday = dayjs(this.props.data.birthday,'YYYY-MM-DD')
        const { name, sex, age, birthday, sal,address,deptId} = this.props.data;
        console.log("REf:", this.props.data)
        this.formRef.current.setFieldsValue({
            name, sex, age, birthday, sal,address,deptId
        });
    }

    render() {
        return (
            <div>
                <Form onFinish={this.onFinish} onFinishFailed={this.onFinishFailed} ref={this.formRef}>
                    <Form.Item
                        label="员工姓名"
                        name="empName"
                        rules={[{ required: true, message: "员工姓名" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="性别"
                        name="sex"
                        rules={[{ required: true}]}
                    >
                        <Radio.Group>
                            <Radio value={"男"}>男</Radio>
                            <Radio value={"女"}>女</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item
                        label="生日"
                        name="birthday"
                        rules={[{ required: true, message: "生日" }]}
                    >
                        <DatePicker format={this.dateFormat} locale={zhCN}/>
                    </Form.Item>

                    <Form.Item
                        label="工资"
                        name="sal"
                        rules={[{ required: true, message: "工资" }]}
                    >
                        <input/>
                    </Form.Item>

                    <Form.Item
                        label="地址"
                        name="address"
                        rules={[{ required: true, message: "地址" }]}
                    >
                        <input/>
                    </Form.Item>

                    <Form.Item
                        label="部门"
                        name="deptId"
                        rules={[{ required: true, message: "部门" }]}
                    >
                        <Select>
                            <Select.Option value="200">Demo</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            修改
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}
export default EditEmpFrm;
