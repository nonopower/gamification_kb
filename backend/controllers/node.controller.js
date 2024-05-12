const db = require('../models');

// Assigning levels to the variable Group
const Node = db.Node;
const GroupNode = db.GroupNode;
const Group = db.Group;
const Op = db.Sequelize.Op;

// Create and Save new Node.
exports.create = async (req, res) => {
    const { title, content, tags, author, groupId } = req.body;

    try {
        const node = await Node.create({
            title: title,
            content: content,
            tags: tags,
            author: author,
            groupId: groupId
        });
        await GroupNode.create({
            GroupId: groupId,
            NodeId: node.id
        })

        // console.log('Created node:', node);
        res.status(200).send({
            message: 'Node created successfully',
            node: node
        });
    } catch (err) {
        // console.log('Error while creating node:', err);
        res.status(500).send({
            message: 'Error while creating node',
            error: err.message
        });
    }
};

// Find all nodes by groupId.
exports.findAllNode = (req, res) => {
    const groupId = req.params.groupId;

    Group.findAll({
            where: {
                id: groupId
            },
            include: [{
                model: Node,
                through: { attributes: [] }
            }],
            
        })
        .then(data => {
            if (data) {
              res.send(data);
            } else {
              res.status(404).send({
                message: `Cannot find group with id=${groupId}.`
              });
            }
        })
        .catch(err => {
            res.status(500).send({
              message: 
                err.message || "Error retrieving group with id=" + groupId,
            });
        });
};

// Find a single node with an id.
exports.findOneNode = (req, res) => {
    const id = req.params.id;

    Node.findByPk(id)
        .then(data => {
            if (data) {
              res.send(data);
            } else {
              res.status(404).send({
                message: `Cannot find node with id=${id}.`
              });
            }
        })
        .catch(err => {
            res.status(500).send({
              message: 
                err.message || "Error retrieving node with id=" + id,
            });
        });
};

exports.updateNode = (req, res) => {
    const nodeId = req.params.nodeId;

    Node.update(req.body, {
        where: { id: nodeId }
    })
    .then(num => {
        if (num == 1) {
            res.status(200).send({
                message: "Node was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update Node with id=${nodeId}. Maybe Node was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: 
                err || "Error updating Node with id=" + nodeId
        });
    });
}

exports.getGroupRanking = async (req, res) => {
    try {
        const query = `
        SELECT "activityId", title, a."GroupId", "groupName" as author, count("NodeId") as score, ROW_NUMBER() over(order by count("NodeId") desc) as rank
        FROM "GroupNodes" as a
        INNER JOIN "Groups" as b ON a."GroupId" = b."id"
        INNER JOIN "ActivityGroups" as c ON b."id" = c."GroupId"
        INNER JOIN "Activities" as d ON c."ActivityId" = d.id
        GROUP BY "activityId", title, a."GroupId", "groupName"
        ORDER BY count("NodeId") desc
        `;
    
        const nodeCounts = await db.sequelize.query(query, { type: db.sequelize.QueryTypes.SELECT });
    
        res.send(nodeCounts);
      } catch (error) {
        res.status(500).json(error);
      }
}

exports.getAllRank = async (req, res) => {
    try {
      const query = `
        SELECT 
            count("author") as score,
            ROW_NUMBER() over(order by count("author") desc) as rank,
            author
        FROM "Nodes"
        GROUP BY author
        ORDER BY count("author") desc`;
  
      const nodeCounts = await db.sequelize.query(query, { type: db.sequelize.QueryTypes.SELECT });
  
      res.send(nodeCounts);
    } catch (error) {
      res.status(500).json(error);
    }
};

