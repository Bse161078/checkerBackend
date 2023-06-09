"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaterialListModule = void 0;
const common_1 = require("@nestjs/common");
const material_list_service_1 = require("./material-list.service");
const material_list_controller_1 = require("./material-list.controller");
const mongoose_1 = require("@nestjs/mongoose");
const material_list_entity_1 = require("./entities/material-list.entity");
const user_entity_1 = require("../user/entities/user.entity");
const order_material_list_entity_1 = require("./entities/order-material-list-entity");
let MaterialListModule = class MaterialListModule {
};
MaterialListModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: material_list_entity_1.Material.name, schema: material_list_entity_1.MaterialSchema },
                { name: user_entity_1.User.name, schema: user_entity_1.UserSchema },
                { name: "material-orders", schema: order_material_list_entity_1.MaterialOrderSchema },
            ])
        ],
        controllers: [material_list_controller_1.MaterialListController],
        providers: [material_list_service_1.MaterialListService]
    })
], MaterialListModule);
exports.MaterialListModule = MaterialListModule;
//# sourceMappingURL=material-list.module.js.map