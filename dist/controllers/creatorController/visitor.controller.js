import Visitor from '../../models/creatorModels/visitor.model.js';
class VisitorController {
    async addVisitor(req, res, next) {
        try {
            const { instagramLink } = req.body;
            const visitor = await Visitor.create({
                instagramLink,
                registered: false
            });
            res.status(201).json({
                success: true,
                message: 'Visitor added successfully',
                data: visitor
            });
        }
        catch (error) {
            next(error);
        }
    }
    async getNotRegisteredVisitors(req, res, next) {
        try {
            const notRegisteredVisitors = await Visitor.find({ registered: false });
            res.status(200).json({
                success: true,
                message: 'Not registered visitors fetched successfully',
                notRegisteredVisitors
            });
        }
        catch (error) {
            next(error);
        }
    }
}
export default new VisitorController();
//# sourceMappingURL=visitor.controller.js.map