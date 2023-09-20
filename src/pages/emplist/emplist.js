import React, {Component} from 'react';
import {Button, message, Popconfirm, Space, Table} from 'antd';
import axios from "axios";
import Search from "antd/es/input/Search";
import AddEmp from "../../componets/empComponet/addEmp";
import EditEmp from "../../componets/empComponet/editEmp";

class EmpList extends Component {
    state = {
        showAddProductDialog: false, //控制添加商品窗口的显示与隐藏
        showEditProductDialog: false, //控制编辑窗口的显示与隐藏
        editData: {}, //要编辑的商品数据
        dataSource: [],
        total: 0, //总的记录数
        pageSize: 3,
        pageNumber: 1,
        searchContent: "", //搜索条件
    }

    columns = [
        {
            title: 'empId',
            dataIndex: 'empId',
            key: 'empId',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'sex',
            dataIndex: 'sex',
            key: 'sex',
        },
        {
            title: 'sal',
            dataIndex: 'sal',
            key: 'sal',
        },
        {
            title: 'birthday',
            dataIndex: 'birthday',
            key: 'birthday',
        },
        {
            title: 'address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'deptId',
            dataIndex: 'deptId',
            key: 'deptId',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Popconfirm
                        okText="确定"
                        cancelText="取消"
                        title="你确定要删除该记录吗？"
                        onConfirm={() => {
                            // console.log(record.empId)
                            this.handleDelete(record.empId);
                        }}
                    >
                        <a>Delete</a>
                    </Popconfirm>
                    <a
                        onClick={() => {
                            this.handleEdit(record.empId);
                        }}>Edit {record.name}</a>
                </Space>
            ),
        },
    ];
    // 查询
    loadData = () => {
        const params = {
            limit: this.state.pageSize,
            page: this.state.pageNumber,
            name: this.state.searchContent,
        };
        // const formData = new FormData();
        // for (const key in params) {
        //     formData.append(key,params[key])
        // }
        axios.get("/api/emp/list",{params}).then((res) => {
           console.log(res);
            this.setState({ dataSource: res.data.data,total:res.data.count });
        });
    };
    // 删除
    handleDelete = (pid) => {
        axios.delete("/api/emp/"+pid).then((res) => {
            console.log(res.data.code)
            if (res.data.code === 0) {
                message.info("删除成功");
                this.loadData();
            } else {
                message.error("删除失败");
            }
        });
    };
    //获取要编辑的员工
    handleAdd = () => {
        this.setState({ showAddProductDialog: true });
    };

    closeAddDialog = () => {
        this.setState({ showAddProductDialog: false }, () => {
            this.loadData();
        });
    };

    handleEdit = (pid) => {
        axios.get("/api/emp/"+pid).then((res) => {
            console.log(res.data.data)
            this.setState({
                editData: res.data.data.emp,
                showEditProductDialog: true,
            });
        });
    };

    closeEditDialog = () => {
        this.setState({ showEditProductDialog: false }, () => {
            this.loadData();
        });
    };

    showEditDialog = (flag) => {
        if (flag) {
            return (
                <EditEmp
                    visible={this.state.showEditProductDialog}
                    close={this.closeEditDialog}
                    data={this.state.editData}
                ></EditEmp>
            );
        }
    };
    //搜索
    onSearch = (value) => {
        // console.log("value=", value);
        this.setState(
            (preState) => {
                preState.searchContent = value;
            },
            () => {
                this.loadData();
            }
        );
    };

    componentDidMount() {
        this.loadData();
    }
    //分页
    changePage = (page, pageSize) => {
        this.setState({ pageSize: pageSize, pageNumber: page }, () => {
            this.loadData();
        });
    };

    render () {
        return (
            <div>
                <Search
                    placeholder="input search text"
                    allowClear
                    enterButton="Search"
                    size="large"
                    style={{ width: 600, marginBottom: 20, marginTop: 10 }}
                    onSearch={this.onSearch}
                />

                <Button
                    type="primary"
                    onClick={this.handleAdd}
                    style={{ margin: "15px" }}
                >
                    添加员工
                </Button>

                <Table columns={this.columns}
                       dataSource={this.state.dataSource}
                       rowKey="empId"
                       pagination={{
                           pageSize: this.state.pageSize,
                           defaultCurrent: this.state.pageNumber,
                           onChange: this.changePage,
                           total: this.state.total,
                       }}
                />

                <AddEmp
                    visible={this.state.showAddProductDialog}
                    close={this.closeAddDialog}
                ></AddEmp>
                {this.showEditDialog(this.state.showEditProductDialog)}
            </div>
        )
    }
}

export default EmpList;