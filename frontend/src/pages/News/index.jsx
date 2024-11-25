import dayjs from 'dayjs';
import { Tag } from 'antd';
import { tagColor } from '@/utils/statusTagColor';

import NewsDataTableModule from '@/modules/NewsModule/NewsDataTableModule';
import { useMoney, useDate } from '@/settings';
import useLanguage from '@/locale/useLanguage';
import { FILE_BASE_URL } from '@/config/serverApiConfig';

export default function News() {
  const translate = useLanguage();
  const { dateFormat } = useDate();

  const searchConfig = {
    entity: 'news',
    displayLabels: ['tittle'],
    searchFields: 'tittle',
  };

  const deleteModalLabels = ['number', 'tittle'];
  
  const dataTableColumns = [
    {
      title: translate('Event ID'),
      dataIndex: 'number',
    },
    {
      title: translate('Tittle'),
      dataIndex: 'tittle',
    },
    {
      title: translate('Content'),
      dataIndex: 'content',
    },
    {
      title: translate('Photo'),
      dataIndex: 'photo',
      render: (photo) => (
        photo ? <img src={photo ? FILE_BASE_URL + photo : undefined} alt="event" style={{ width: '100px' }} /> : translate('No Photo')
      ),
    },
    {
      title: translate('Schedule'),
      dataIndex: 'schedule',
      render: (schedule) => dayjs(schedule).format(dateFormat),
    },
    {
      title: translate('Status'),
      dataIndex: 'status',
      render: (status) => {
        let tagStatus = tagColor(status);
        return (
          <Tag color={tagStatus.color}>
            {status && translate(tagStatus.label)}
          </Tag>
        );
      },
    },
  ];

  const entity = 'news';
  const Labels = {
    PANEL_TITLE: translate('News Management'),
    DATATABLE_TITLE: translate('news_list'),
    ADD_NEW_ENTITY: translate('add_new_event'),
    ENTITY_NAME: translate('Event'),
  };

  const configPage = {
    entity,
    ...Labels,
  };

  const config = {
    ...configPage,
    dataTableColumns,
    searchConfig,
    deleteModalLabels,
  };

  return <NewsDataTableModule config={config} />;
}
