package com.example.mapper;


import com.example.dto.AdminDTO;
import com.example.dto.CustomerDTO;
import com.example.model.Admin;
import com.example.model.Customer;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserMapper {

    AdminDTO toAdminDTO(Admin admin);

    Admin toAdminEntity(AdminDTO adminDTO);

    CustomerDTO toCustomerDTO(Customer customer);

    Customer toCustomerEntity(CustomerDTO customerDTO);


}
