import {Component} from "react";
import {Button, DatePicker, Form, Input, message, Radio, Select} from "antd";
import axios from "axios";

class AddEmpFrm extends Component {

    dateFormat = 'YYYY-MM-DD';

    onFinish = (values) => {
        const params = {
            ...values
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
            .post("/emp/emp", formData)
            .then((res) => {
                message.info("添加商品成功");
                this.props.closeModal();
            })
            .catch((error) => {
                console.log("error=", error);
            });
    };

    render() {
        return (
            <div>
                <Form onFinish={this.onFinish} onFinishFailed={this.onFinishFailed}>
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
                            <Radio value={"F"}>男</Radio>
                            <Radio value={"M"}>女</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item
                        label="生日"
                        name="birthday"
                        rules={[{ required: true, message: "生日" }]}
                    >
                        <DatePicker format={this.dateFormat}/>
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
                            添加
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}
export default AddEmpFrm;
