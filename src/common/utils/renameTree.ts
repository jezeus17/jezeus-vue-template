export function renameTree(tree, label: string, key: string) {
  // Recorre cada nodo del árbol

  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];

    // Cambia la clave 'name' a 'label'
    if (label in node) {
      node.label = node[label];
      delete node[label];
    }
    if (key in node) {
      node.key = node[key];
      delete node[key];
    }

    // Recorre recursivamente los hijos del nodo actual
    if ("children" in node && node.children.length > 0) {
      renameTree(node.children, label, key);
    }
  }

  // Devuelve el árbol modificado
  return tree;
}

export function renameTreeAndRemoveNode(
  tree: any[],
  label: string,
  key: string,
  idToRemove: number
): any[] {
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];

    // Renombrar propiedades (name -> label, id_group -> key, etc.)
    if (label in node) {
      node.label = node[label];
      delete node[label];
    }
    if (key in node) {
      node.key = node[key];
      delete node[key];
    }

    // Buscar y eliminar el nodo con idToRemove de los hijos del padre
    if (node.children && node.children.length > 0) {
      // Filtramos los hijos para excluir el nodo a eliminar
      node.children = node.children.filter(
        (child: any) => child[key] !== idToRemove
      );

      // Llamada recursiva para procesar los hijos restantes
      renameTreeAndRemoveNode(node.children, label, key, idToRemove);
    }
  }

  return tree;
}

export function renameTreeForTreeTable(tree) {
  // Recorre cada nodo del árbol
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];

    // Cambia la clave 'name_group' a 'name' si existe
    if (node["id_group"]) {
      node.key = node.id_group;

      node.data = {
        name_group: node.name_group,
        father_group: node.father_group,
      };
    }

    // Recorre recursivamente los hijos si existen
    if (
      Object.prototype.hasOwnProperty.call(node, "children") &&
      Array.isArray(node.children)
    ) {
      renameTreeForTreeTable(node.children); // Llamada recursiva para los hijos
    }
  }
  return tree;
}

export function generateCheckedKeys(treeData) {
  const result = {};
  console.log(treeData)
  function traverse(nodes) {
    nodes.forEach(node => {
      // Agregar el nodo actual al resultado
      result[node.key] = { checked: true };

      // Recorrer hijos recursivamente si existen
      if (node.children && node.children.length > 0) {
        traverse(node.children);
      }
    });
  }

  traverse(treeData);
  return result;
}
export function findRootGroupId(tree: any[], targetId: number): number | null {
  const targetNode = findNodeById(tree, targetId);
  if (!targetNode) return null;

  if (targetNode.father_group === null) {
    return targetNode.key;
  }

  return findRootGroupId(tree, targetNode.father_group);
}

function findNodeById(nodes: any[], id: number): any | null {

  for (const node of nodes) {
    if (node.key === id) {
      console.log(node)
      return node;
    }
    if (node.children && node.children.length > 0) {
      const foundInChildren = findNodeById(node.children, id);
      if (foundInChildren) {
        return foundInChildren;
      }
    }
  }
  return null;
}
