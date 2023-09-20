import { Component } from "react";
import { Modal } from "antd";
import AddEmpFrm from "./addEmpFrm";

class AddEmp extends Component {

    closeModal = () => {
        this.props.close();
    };

    render() {
        return (
            <Modal
                visible={this.props.visible}
                onCancel={() => this.props.close()}
                title="添加商品"
                okText="添加"
                cancelText="取消"
                destroyOnClose
                width="800px"
            >
                <AddEmpFrm closeModal={this.closeModal}></AddEmpFrm>
            </Modal>
        );
    }
}
export default AddEmp;
