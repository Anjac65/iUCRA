import useLanguage from '@/locale/useLanguage';
import CreateNewsModule from '@/modules/NewsModule/CreateNewsModule';

export default function NewsCreate() {
  const translate = useLanguage();

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
  return <CreateNewsModule config={configPage} withUpload/>;
}
