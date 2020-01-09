function Node(data, right, left) {
    this.data = data;
    this.left = left;
    this.right = right;
}

function binarySearchTree(root) {
    this.root = root;
}

function add(node, newNode) {
    if (newNode.data < node.data) {
        if (node.left) add(node.left, newNode);
        if (!node.left) node.left = newNode;
    }
    if (newNode.data > node.data) {
        if (node.right) add(node.right, newNode);
        if (!node.right) node.right = newNode;
    }
}

binarySearchTree.prototype.addNode = function (node) {
    if (this.root === undefined) {
        this.root = node;
    }
    add(this.root, node);
}


binarySearchTree.prototype.findMinNode = function (node) {
    if (node.left) findMinNode(node.left)
    else return node;
}

function removeChild(node, target) {
    if (!node) return node;

    if (node === target) return node;

    if (node.left === target) {
        node.left = null;
        return node;
    }
    if (node.right === target) {
        node.right = null;
        return node;
    }
    if (node.data < target.data) {
        node.left = removeChild(node.left);
        return node
    }
    if (node.data > target.data) {
        node.right = removeChild(node.right);
        return node;
    }

}
binarySearchTree.prototype.remove = function (node, data) {
    if (!node) return;
    if (data < node.data) {
        node.left = this.remove(node.left, data);
        return node;
    }
    if (data > node.data) {
        node.right = this.remove(node.right, data);
        return node;
    }

    if (data === node.data) {
        if (!node.left && !node.right) {
            node = null;
            return node;
        }
        if (!node.left) {
            node = node.right;
            return node;

        }
        if (!node.right) {
            node = node.left;
            return node;
        }

        let minNode = this.findMinNode(node.right);
        const newNode = removeChild(node.right, minNode);
        minNode.right = newNode.right;
        minNode.left = node.left;
        node = minNode;
        return node;
    }
}

function inOrder(node) {
    if (node) {
        inOrder(node.left);
        console.log(node.data);
        inOrder(node.right);
    }
}
binarySearchTree.prototype.inOrderTraversal = function () {
    inOrder(this.root);
}

const root = new Node(4);

const node1 = new Node(1);
const node2 = new Node(0);
const node3 = new Node(3);
const node4 = new Node(5);

const bst = new binarySearchTree(root);
bst.addNode(node1);
bst.addNode(node2);
bst.addNode(node3);
bst.addNode(node4);
bst.inOrderTraversal();

bst.root = bst.remove(bst.root, 1);
bst.inOrderTraversal();
