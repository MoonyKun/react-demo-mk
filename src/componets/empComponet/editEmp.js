import {Component} from "react";
import {Modal} from "antd";
import EditEmpFrm from "./editEmpFrm";

class EditEmp extends Component {
    closeModal = () => {
        this.props.close();
    };

    render() {
        return (
            <div>
                <Modal
                    visible={this.props.visible}
                    title="编辑商品"
                    okText="编辑"
                    cancelText="取消"
                    width="800px"
                    onCancel={() => this.props.close()}
                >
                    <EditEmpFrm
                        data={this.props.data}
                        closeModal={this.closeModal}
                    ></EditEmpFrm>
                </Modal>
            </div>
        );
    }
}

export default EditEmp;
