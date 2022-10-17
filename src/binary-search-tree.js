const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/


class BinarySearchTree {
  constructor() {
    this.head = null;
  }

  root() {
    //throw new NotImplementedError('Not implemented');
    return this.head;
  }

  add(data) {
    //throw new NotImplementedError('Not implemented');
    // общая логика как для всего дерева, так и для поддерева
    this.head = addData(this.head, data);

    function addData(node, data) {
      // базовое условие рекурсии
      if (!node) {
        return new Node(data)
      }

      if (node.data === data) {
        return node;
      }
      // к левому или правому потомку положим либо новый узел(если он последний), либо самого себя либо опять вызовем метод с другим корнем и положим всю структуру
      if (data < node.data) {
        node.left = addData(node.left, data);
      } else {
        node.right = addData(node.right, data);
      }
      return node;
    }
  }

  has(data) {
    //throw new NotImplementedError('Not implemented');
    return searchData(this.head, data);

    function searchData(node, data) {
      // проверяем, есть ли узел
      if (!node) {
        return false;
      }
      // проверяем, равен ли он искомому
      if (node.data === data) {
        return true;
      }
      // если узел есть, но его значение не равно data, то ищем в левом или правом узле
      return data < node.data ?
        searchData(node.left, data) :
        searchData(node.right, data);
    }
  }

  find(data) {
    //throw new NotImplementedError('Not implemented');
    return searchNode(this.head, data);

    function searchNode(node, data) {
      // проверяем, есть ли узел
      if (!node) {
        return null;
      }
      // проверяем, равен ли он искомому
      if (node.data === data) {
        return node;
      }
      // если узел есть, но его значение не равно data, то ищем в левом или правом узле
      return data < node.data ?
        searchNode(node.left, data) :
        searchNode(node.right, data);
    }
  }

  remove(data) {
    //throw new NotImplementedError('Not implemented');
    this.head = removeData(this.head, data);

    function removeData(node, data) {
      // точка остановки рекурсии
      if (!node) {
        return null;
      }
      //определяем в какую сторону пойти и удалим из нужного дерева data и вернем новое дерево=результат без удаленного элемента
      if (data < node.data) {
        node.left = removeData(node.left, data);
        return node;
      } else if (node.data < data) {
        node.right = removeData(node.right, data);
        return node;
        //значение = тому, что находится в узле
        //если узел - лист, т.е. нет потомков, заменяем его на null
      } else {
        if (!node.left && !node.right) {
          return null;
        }
        //если нет левого потомка, то вместо удаленного узла помещаем правое поддерево и возвращаем обновленный узел
        if (!node.left) {
          node = node.right;
          return node;
        }
        if (!node.right) {
          node = node.left;
          return node;
        }
        //есть 2 потомка
        // ищем минимум среди правого поддерева, начиная с его корня и сдвигая указатель влево
        let minRight = node.right;
        while (minRight.left) {
          minRight = minRight.left;
        }
        //минимальное значение помещаем в значение удаляемого узла
        node.data = minRight.data;
        //удаляем узел с минимальным значением с правого поддерева
        node.right = removeData(node.right, minRight.data);
        return node;
      }
    }
  }

  min() {
    //throw new NotImplementedError('Not implemented');
    //проверяемБ есть ли элементы
    if (!this.head) {
      return;
    }
    //начигаем искать мин. элемент с корня, если есть элемент левее, т.е. меньше, переходим к нему
    let node = this.head;
    while (node.left) {
      node = node.left;
    }
    return node.data;
  }

  max() {
    //throw new NotImplementedError('Not implemented');
    if (!this.head) {
      return;
    }
    //начинаем искать макс. элемент с корня, если есть элемент правее, т.е. больше, переходим к нему
    let node = this.head;
    while (node.right) {
      node = node.right;
    }
    return node.data;
  }
}

module.exports = {
  BinarySearchTree
};