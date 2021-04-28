import {
  getSolidDataset,
  getThingAll,
  getStringNoLocale,
  getBoolean,
} from "@inrupt/solid-client";

import { fetch } from "@inrupt/solid-client-authn-browser";
import { SCHEMA_INRUPT } from "@inrupt/vocab-common-rdf";
import CreateTodoList from "./CreateNewTodoList";

/* Try to retrieve the TodoList and Todo items.
If the TodoList resource doesn't exist create one and save it to the Pod */
async function ReadTodoList(resourceUrl, setDataSet, setTodos) {
    try {
      let savedTodoList = await getSolidDataset(resourceUrl, {
        fetch: fetch,
      });

      if (savedTodoList) {
        /* Set retrieved dataSet to state */
        setDataSet(savedTodoList);

        /* Get all Things from the Todo dataset
        extract title and status(completed/incomplete)
        and set Todo array to state */
        let items = getThingAll(savedTodoList);
        let array = [];
        for (let i = 0; i < items.length; i++) {
          let itemTitle = getStringNoLocale(items[i], SCHEMA_INRUPT.name);
          let itemStatus = getBoolean(items[i], "http://schema.org/status");
          if (itemTitle != null) {
            let item = [itemTitle, items[i].internal_url, itemStatus];
            array.push(item);
          }
        }
        setTodos(array);
      }
    }
    catch (error) {
      console.log(error.response);
      /* If fetching the resource fails with a 404,
      create a dataset resource and save it to the same location */
      if (error.response.status === 404) {
        CreateTodoList(resourceUrl, setDataSet)
      }
    }
}

  export default ReadTodoList;