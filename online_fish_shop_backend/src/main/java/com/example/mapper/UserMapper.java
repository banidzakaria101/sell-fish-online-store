package com.example.mapper;


import com.example.dto.AdminDTO;
import com.example.dto.CustomerDTO;
import com.example.model.Admin;
import com.example.model.Customer;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {

    AdminDTO toAdminDTO(Admin admin);

    Admin toAdminEntity(AdminDTO adminDTO);

    CustomerDTO toCustomerDTO(Customer customer);

    Customer toCustomerEntity(CustomerDTO customerDTO);


}
