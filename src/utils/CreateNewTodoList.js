import {
  createSolidDataset,
  saveSolidDatasetAt,
} from "@inrupt/solid-client";

import { fetch } from "@inrupt/solid-client-authn-browser";

async function CreateTodoList(podUrl, setDataSet) {

  let TodoList = createSolidDataset();

  try {
    const savedTodoList = await saveSolidDatasetAt(`${podUrl}`, TodoList, {
      fetch: fetch,
    });

    setDataSet(savedTodoList);

  } catch (error) {
    console.log(error);
  }
}

export default CreateTodoList;
