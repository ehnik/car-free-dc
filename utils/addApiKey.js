//takes station location and returns arriving trains
import postApi from './postApi'

export default function addApiKey(){
    postApi({"Type":"wmata","Key":"a6e753a87f8d49a086f85f165ace7a05"},"apikeys");
}
