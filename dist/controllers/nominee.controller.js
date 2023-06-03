import Nominee from '../models/nominee.model.js';
class NomineeController {
    async createNominee(req, res, next) {
        try {
            const nomineeInfo = req.body;
            await Nominee.create(nomineeInfo);
            res.status(201).json({
                success: true,
                msg: 'Nominee created successfully!'
            });
        }
        catch (error) {
            next(error);
        }
    }
    async fetchNominees(req, res, next) {
        try {
            const nominees = await Nominee.find();
            res.status(200).json({ success: true, data: nominees });
        }
        catch (error) {
            next(error);
        }
    }
}
export default new NomineeController;
//# sourceMappingURL=nominee.controller.js.map