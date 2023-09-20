import React, {useState} from 'react';
import {DesktopOutlined, PieChartOutlined,} from '@ant-design/icons';
import {Breadcrumb, Layout, Menu, theme} from 'antd';
import {Outlet, useNavigate} from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const items = [
    getItem('首页', '/index', <PieChartOutlined />),
    getItem('员工管理', '/index/emplist', <DesktopOutlined />),
];

const Index = (props) => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const navigate = useNavigate()

    const onClick = (e) => {
        console.log(e.key)
        navigate(e.key)
    }

    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical"/>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={onClick}/>
            </Sider>

            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                />
                <Content
                    style={{
                        margin: '0 16px',
                    }}
                >
                    <Breadcrumb
                        style={{
                            margin: '16px 0',
                        }}
                    >
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill</Breadcrumb.Item>
                    </Breadcrumb>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                        }}
                    >
                        <Outlet></Outlet>
                    </div>
                </Content>

                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    员工管理系统 ©2023 Created by Moonykun
                </Footer>
            </Layout>
        </Layout>
    );
};
export default Index;