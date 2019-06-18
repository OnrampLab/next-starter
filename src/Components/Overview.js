import {
  Archive,
  Bell,
  Bookmark,
  Crosshair,
  Edit,
  GitCommit,
  MessageCircle,
  MoreHorizontal,
  PhoneCall,
  Printer,
  Save,
  Server,
  Trash,
  TrendingDown,
  TrendingUp,
  Users,
} from 'react-feather';
import {
  Avatar,
  Card,
  Col,
  DatePicker,
  Dropdown,
  List,
  Menu,
  message,
  Progress,
  Row,
  Timeline
} from 'antd';
import {
  DiscreteColorLegend,
  FlexibleWidthXYPlot,
  HorizontalGridLines,
  VerticalBarSeries,
  VerticalGridLines,
  XAxis,
  YAxis
} from 'react-vis';

import NoSSR from 'react-no-ssr';
import styled from 'styled-components';
import StatCard from './shared/StatCard';
import { theme } from './styles/GlobalStyles';

const { MonthPicker } = DatePicker;

const axes = Array.from(Array(12).keys());

const generate = () => {
  let arr = [];
  axes.map(x => {
    const y = Math.floor(Math.random() * 10) + 1;
    arr.push({ x, y });
  });
  return arr;
};

const series = [
  {
    title: 'Views',
    data: generate()
  },
  {
    title: 'Sales',
    data: generate()
  }
];

const Legend = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0;
  .rv-discrete-color-legend {
    display: inline-block;
    width: auto !important;
  }
  .rv-discrete-color-legend-item {
    padding-top: 0;
    padding-bottom: 0;
  }
`;

const menu = (
  <Menu>
    <Menu.Item>
      <Row type="flex" align="middle">
        <Archive size={16} strokeWidth={1} className="mr-3" />{' '}
        <span>Archive</span>
      </Row>
    </Menu.Item>
    <Menu.Item>
      <Row type="flex" align="middle">
        <Edit size={16} strokeWidth={1} className="mr-3" /> <span>Edit</span>
      </Row>
    </Menu.Item>
    <Menu.Item>
      <Row type="flex" align="middle">
        <Trash size={16} strokeWidth={1} className="mr-3" /> <span>Delete</span>
      </Row>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item>
      <Row type="flex" align="middle">
        <Save size={16} strokeWidth={1} className="mr-3" /> <span>Save as</span>
      </Row>
    </Menu.Item>
    <Menu.Item>
      <Row type="flex" align="middle">
        <Printer size={16} strokeWidth={1} className="mr-3" />{' '}
        <span>Print</span>
      </Row>
    </Menu.Item>
  </Menu>
);

const data = [
  {
    title: 'Click through ratio',
    subtitle: (
      <span>
        <span className="mr-1">15%</span>
        <TrendingUp size={20} strokeWidth={1} className="text-success" />
      </span>
    )
  },
  {
    title: 'Cost per thousand',
    subtitle: (
      <span>
        <span className="mr-1">$320.89</span>
        <TrendingDown size={20} strokeWidth={1} className="text-error" />
      </span>
    )
  },
  {
    title: 'Bounce rate',
    subtitle: (
      <span>
        <span className="mr-1">34%</span>
        <TrendingUp size={20} strokeWidth={1} className="text-success" />
      </span>
    )
  }
];

const TimelinePeriod = ({ content }) => (
  <small
    className="text-muted"
    css={`
      display: block;
    `}
  >
    {content}
  </small>
);

export const Overview = () => {
  return (
    <div>
      <Row gutter={16}>
        <Col xs={24} sm={12} md={6}>
          <StatCard
            type="fill"
            title="Actions"
            value={103}
            icon={<Bookmark size={20} strokeWidth={1} />}
            color={theme.primaryColor}
            clickHandler={() => message.info('Campaign stat button clicked')}
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatCard
            type="fill"
            title="Customers"
            value={230}
            icon={<Users size={20} strokeWidth={1} />}
            color={theme.primaryColor}
            clickHandler={() => message.info('Customers stat button clicked')}
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatCard
            type="fill"
            title="Segments"
            value={7}
            icon={<Crosshair size={20} strokeWidth={1} />}
            color={theme.primaryColor}
            clickHandler={() => message.info('Queries stat button clicked')}
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatCard
            type="fill"
            title="Opens"
            value={870}
            icon={<MessageCircle size={20} strokeWidth={1} />}
            color={theme.primaryColor}
            clickHandler={() => message.info('Opens stat button clicked')}
          />
        </Col>
      </Row>
    </div>
  );
};
