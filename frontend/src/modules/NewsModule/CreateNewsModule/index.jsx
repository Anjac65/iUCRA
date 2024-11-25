import { ErpLayout } from '@/layout';
import CreateItem from '@/modules/ErpPanelModule/CreateItem';
import NewsForm from '@/modules/NewsModule/Forms/NewsForm';

export default function CreateNewsModule({ config }) {
  return (
    <ErpLayout>
      <CreateItem config={config} CreateForm={NewsForm} withUpload/>
    </ErpLayout>
    
  );
}