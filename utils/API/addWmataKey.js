//Saves WMATA key to database

import saveData from './saveData'

export default function addWmataKey(){
    saveData({"Type":"wmata","Key":"a6e753a87f8d49a086f85f165ace7a05"},"apikeys");
}
